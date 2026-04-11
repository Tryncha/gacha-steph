// Calculate a random integer between [min, max)
export function calcRandomInt(min: number = 0, max: number = 1) {
  return Math.floor(Math.random() * (max - min) + min);
}
