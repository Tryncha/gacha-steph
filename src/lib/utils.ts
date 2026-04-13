import { prizes } from './constants';

// Calculate a random integer between [min, max)
// Only used for testing
export function calcRandomInt(min: number = 0, max: number = 1) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function calcPrizeIndex() {
  const prob = Math.random();

  if (prob < prizes[prizes.length - 1].prob) {
    return prizes.length - 1;
  }

  return Math.floor(Math.random() * prizes.length);
}

export function checkTotalProb() {
  const totalProb = prizes.reduce((acc, prize) => prize.prob + acc, 0);

  if (totalProb !== 1) {
    throw new Error(`La probabilidad de los premios es igual a ${totalProb * 100}%\n¡Debe ser igual al 100%!`);
  }

  return totalProb;
}
