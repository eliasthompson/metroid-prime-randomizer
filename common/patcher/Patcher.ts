import { ipcMain } from 'electron';
import { execFile } from 'child_process';
import { mkdirSync, existsSync, writeFileSync } from 'fs';
import { Randomizer } from '../randomizer/Randomizer';
const addon = require('../../build/Release/randomprime');

export class Patcher {
    workingFolder: string;

    constructor() {
        // If Windows portable file, use enviornment variable to properly set working directory
        // due to the relative path being within the unpacked application in AppData
        this.workingFolder = process.env.PORTABLE_EXECUTABLE_DIR;
        if (!this.workingFolder) {
            this.workingFolder = '.';
        }

        // Handle IPC randomizer call from renderer
        ipcMain.on('randomizer', (event, arg) => {
            this.randomizeAndPatch(arg, event);
        });
    }

    public randomizeAndPatch(game, event?) {
        // Create randomizer object and run based on settings
        const randomizer = new Randomizer(
            game.settings.mode,
            game.settings.logic,
            game.settings.artifacts,
            game.settings.difficulty
        );

        if (game.seed) {
            randomizer.randomize(game.seed);
        } else {
            randomizer.randomize();
        }

        const layoutDescriptor = randomizer.getWorld().generateLayout();

        // Set default output folder to working directory if one isn't provided by the user
        if (!game.rom.outputFolder) {
            game.rom.outputFolder = this.workingFolder + '/output';

            // Create default output folder if it doesn't exist
            if (!existsSync(game.rom.outputFolder)) {
                mkdirSync(game.rom.outputFolder);
            }
        }

        const randomprime = './bin/randomprime_patcher.win_64bit.exe';
        const outputFile = 'Prime_' + game.version + '_' + randomizer.getLogic() + '_' + randomizer.getMode()
        + '_' + randomizer.getRandomizedArtifacts() + '_' + randomizer.getDifficulty() + '_' + randomizer.getSeed();

        const params = [
            '--skip-frigate',
            '--non-modal-item-messages',
            '--input-iso', game.rom.baseIso,
            '--output-iso', game.rom.outputFolder + '/' + outputFile + '.iso',
            '--layout', layoutDescriptor
        ];

        if (game.rom.spoiler) {
            this.writeSpoilerLog(randomizer, game.version, game.rom.outputFolder + '/' + outputFile + '_spoiler.txt');
        }

        let child;
        if (game.rom.createIso) {
            child = execFile(randomprime, params, function (error, stdout, stderr) {
                if (error) {
                    console.log('error', error);
                    if (event) {
                        event.sender.send('patching-error', error);
                    }
                }
            });

            // use event hooks to provide a callback to execute when data are available:
            // hook on stdout for progress updates, send progress to view
            child.stdout.on('data', function (data) {
                console.log('stdout', data.toString());

                // mark game as successfully patched if stdout reaches Done
                if (event) {
                    if (data.toString().indexOf('Done') > -1) {
                        event.sender.send('patch-complete');
                    } else {
                        event.sender.send('patch-update', data.toString());
                    }
                }
            });

            // send errors to view if needed
            child.stderr.on('data', function (data) {
                const msg = data.toString();
                console.log('stderr', msg);
                if (event) {
                    let errMsg = msg;
                    const errorIndex = msg.indexOf('error: ');
                    if (errorIndex > -1) {
                        errMsg = msg.substr(errorIndex + 'error: '.length);
                    }
                    event.sender.send('patching-error', errMsg);
                }
            });

            // output error code to Electron main console
            child.on('exit', (code, signal) => {
                console.log('exit code', code);
            });
        } else if (event) {
            event.sender.send('patch-complete');
        }
    }

    public writeSpoilerLog(randomizer: Randomizer, version: string, path: string) {
        const spoiler = this.generateSpoilerLog(randomizer, version);
        writeFileSync(path, spoiler);
    }

    generateSpoilerLog(randomizer: Randomizer, version: string) {
        const spoiler: any = { info: {} };
        spoiler.info.version = version;
        // spoiler.info.permalink = this.generatedPermalink;
        spoiler.info.seed = randomizer.getSeed();
        spoiler.info.logic = randomizer.getLogic();
        spoiler.info.mode = randomizer.getMode();
        spoiler.info.artifacts = randomizer.getRandomizedArtifacts();
        spoiler.info.difficulty = randomizer.getDifficulty();
        spoiler.locations = JSON.parse(randomizer.getWorld().toJson());

        return JSON.stringify(spoiler, null, '\t');
      }
}
