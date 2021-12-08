import inputData from "./inputData";

export function getBestPosition(positions: number[]) {
  positions.sort((a, b) => a - b);

  let mid = Math.floor(positions.length / 2);
  return positions[mid];
}

const bestPosition = getBestPosition(inputData);

export const calcFuel = (desiredPosition: number, crabs: number[]) =>
  crabs.reduce((fuel, c) => Math.abs(desiredPosition - c) + fuel, 0);

console.log(calcFuel(bestPosition, inputData));
