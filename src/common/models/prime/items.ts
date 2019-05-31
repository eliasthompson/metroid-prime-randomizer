import { Item } from '../item';
import { PrimeItem } from '../../enums/primeItem';

const primeItems = {
  [PrimeItem.MISSILE_LAUNCHER]: new Item(PrimeItem.MISSILE_LAUNCHER, 0),
  [PrimeItem.MISSILE_EXPANSION]: new Item(PrimeItem.MISSILE_EXPANSION, 0),
  [PrimeItem.ENERGY_TANK]: new Item(PrimeItem.ENERGY_TANK, 1),
  [PrimeItem.THERMAL_VISOR]: new Item(PrimeItem.THERMAL_VISOR, 2),
  [PrimeItem.XRAY_VISOR]: new Item(PrimeItem.XRAY_VISOR, 3),
  [PrimeItem.VARIA_SUIT]: new Item(PrimeItem.VARIA_SUIT, 4),
  [PrimeItem.GRAVITY_SUIT]: new Item(PrimeItem.GRAVITY_SUIT, 5),
  [PrimeItem.PHAZON_SUIT]: new Item(PrimeItem.PHAZON_SUIT, 6),
  [PrimeItem.MORPH_BALL]: new Item(PrimeItem.MORPH_BALL, 7),
  [PrimeItem.BOOST_BALL]: new Item(PrimeItem.BOOST_BALL, 8),
  [PrimeItem.SPIDER_BALL]: new Item(PrimeItem.SPIDER_BALL, 9),
  [PrimeItem.MORPH_BALL_BOMB]: new Item(PrimeItem.MORPH_BALL_BOMB, 10),
  [PrimeItem.POWER_BOMB_EXPANSION]: new Item(PrimeItem.POWER_BOMB_EXPANSION, 11),
  [PrimeItem.POWER_BOMB]: new Item(PrimeItem.POWER_BOMB, 12),
  [PrimeItem.CHARGE_BEAM]: new Item(PrimeItem.CHARGE_BEAM, 13),
  [PrimeItem.SPACE_JUMP_BOOTS]: new Item(PrimeItem.SPACE_JUMP_BOOTS, 14),
  [PrimeItem.GRAPPLE_BEAM]: new Item(PrimeItem.GRAPPLE_BEAM, 15),
  [PrimeItem.SUPER_MISSILE]: new Item(PrimeItem.SUPER_MISSILE, 16),
  [PrimeItem.WAVEBUSTER]: new Item(PrimeItem.WAVEBUSTER, 17),
  [PrimeItem.ICE_SPREADER]: new Item(PrimeItem.ICE_SPREADER, 18),
  [PrimeItem.FLAMETHROWER]: new Item(PrimeItem.FLAMETHROWER, 19),
  [PrimeItem.WAVE_BEAM]: new Item(PrimeItem.WAVE_BEAM, 20),
  [PrimeItem.ICE_BEAM]: new Item(PrimeItem.ICE_BEAM, 21),
  [PrimeItem.PLASMA_BEAM]: new Item(PrimeItem.PLASMA_BEAM, 22),
  [PrimeItem.ARTIFACT_OF_LIFEGIVER]: new Item(PrimeItem.ARTIFACT_OF_LIFEGIVER, 23),
  [PrimeItem.ARTIFACT_OF_WILD]: new Item(PrimeItem.ARTIFACT_OF_WILD, 24),
  [PrimeItem.ARTIFACT_OF_WORLD]: new Item(PrimeItem.ARTIFACT_OF_WORLD, 25),
  [PrimeItem.ARTIFACT_OF_SUN]: new Item(PrimeItem.ARTIFACT_OF_SUN, 26),
  [PrimeItem.ARTIFACT_OF_ELDER]: new Item(PrimeItem.ARTIFACT_OF_ELDER, 27),
  [PrimeItem.ARTIFACT_OF_SPIRIT]: new Item(PrimeItem.ARTIFACT_OF_SPIRIT, 28),
  [PrimeItem.ARTIFACT_OF_TRUTH]: new Item(PrimeItem.ARTIFACT_OF_TRUTH, 29),
  [PrimeItem.ARTIFACT_OF_CHOZO]: new Item(PrimeItem.ARTIFACT_OF_CHOZO, 30),
  [PrimeItem.ARTIFACT_OF_WARRIOR]: new Item(PrimeItem.ARTIFACT_OF_WARRIOR, 31),
  [PrimeItem.ARTIFACT_OF_NEWBORN]: new Item(PrimeItem.ARTIFACT_OF_NEWBORN, 32),
  [PrimeItem.ARTIFACT_OF_NATURE]: new Item(PrimeItem.ARTIFACT_OF_NATURE, 33),
  [PrimeItem.ARTIFACT_OF_STRENGTH]: new Item(PrimeItem.ARTIFACT_OF_STRENGTH, 34)
};

export { primeItems };