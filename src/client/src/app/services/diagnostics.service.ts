import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ElectronService } from './electron.service';

export interface IsoData {
  errMsg?: string;
  gameCode?: string;
  revision?: number;
  md5Hash?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DiagnosticsService {
  private isoData$ = new BehaviorSubject<IsoData>(undefined);
  _isoData = this.isoData$.asObservable();

  constructor(private ngZone: NgZone, private electronService: ElectronService, private toastrService: ToastrService) {
    this.electronService.ipcRenderer.on('parseIsoResponse', (event, data: IsoData) => {
      this.ngZone.run(() => {
        this.isoData$.next(data);
      });
    });

    this.electronService.ipcRenderer.on('saveIsoDataResponse', (event, errMsg: string) => {
      this.ngZone.run(() => {
        if (errMsg) {
          this.toastrService.error('Failed to save diagnostics: ' + errMsg);
        } else {
          this.toastrService.success('Diagnostics saved.');
        }
      });
    });
  }

  verifyIso(isoPath: string) {
    this.electronService.ipcRenderer.send('parseIso', isoPath);
  }

  setIsoData(data: IsoData) {
    this.isoData$.next(data);
  }

  saveIsoData(isoData: IsoData) {
    this.electronService.dialog.showSaveDialog({
      title: 'Save ISO Data',
      filters: [
        { name: 'JSON Files', extensions: ['json'] }
      ]
    }).then(result => {
      if (!result.canceled && result.filePath) {
        this.electronService.ipcRenderer.send('saveIsoData', isoData, result.filePath);
      }
    });
  }
}
