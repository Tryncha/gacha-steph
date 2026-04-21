import { Prize } from '../types';

export const prizes: Prize[] = [
  {
    name: 'Medias',
    prizeId: 'medias',
    boxId: 'cajas_del_gacha01',
    prob: 0.18
  },
  {
    name: 'Falda',
    prizeId: 'falda',
    boxId: 'cajas_del_gacha006',
    prob: 0.15
  },
  {
    name: 'Correa',
    prizeId: 'correa',
    boxId: 'cajas_del_gacha010',
    prob: 0.12
  },
  {
    name: 'Botas',
    prizeId: 'botas',
    boxId: 'cajas_del_gacha003',
    prob: 0.12
  },
  {
    name: 'Alas',
    prizeId: 'alas',
    boxId: 'cajas_del_gacha004',
    prob: 0.12
  },
  {
    name: 'Collar',
    prizeId: 'collar',
    boxId: 'cajas_del_gacha002',
    prob: 0.1
  },
  {
    name: 'Paticas',
    prizeId: 'paticas',
    boxId: 'cajas_del_gacha005',
    prob: 0.1
  },
  {
    name: 'Blusa',
    prizeId: 'blusa',
    boxId: 'cajas_del_gacha007',
    prob: 0.05
  },
  {
    name: 'Cabeza',
    prizeId: 'cabeza',
    boxId: 'cajas_del_gacha009',
    prob: 0.05
  },
  {
    name: 'Especial',
    prizeId: 'especial',
    boxId: 'Cube001',
    prob: 0.01
  }
];

export const WISH_BUTTON_ID = 'Cube011';

export const GACHA_LOOPS = 10;
export const WISH_STAR_COST = 70;
export const MAX_STARS = 9999;

// Bunnies
export const BUNNY_OSCILLATION = {
  X: { SPEED: 2, INTENSITY: 0.05 },
  Y: { SPEED: 2, INTENSITY: 0.05 },
  Z: { SPEED: 2, INTENSITY: 0.05 }
};

// Gacha
export const INITIAL_POSITION = { X: 1, Y: -2.5, Z: 1 };
