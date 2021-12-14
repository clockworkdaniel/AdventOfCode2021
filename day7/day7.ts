import inputData from "./inputData";

export const getBestPosition = (positions: number[]) => {
  positions.sort((a, b) => a - b);

  let mid = Math.floor(positions.length / 2);
  return positions[mid];
};

const bestPosition = getBestPosition(inputData);

export const calcFuel = (desiredPosition: number, positions: number[]) =>
  positions.reduce((fuel, c) => Math.abs(desiredPosition - c) + fuel, 0);

console.log(calcFuel(bestPosition, inputData));
