import inputData from "./inputData";

export function getBestPosition(positions: number[]) {
  positions.sort((a, b) => a - b);

  let mid = Math.floor(positions.length / 2);
  return positions[mid];
}

export const calcFuel = (desiredPosition: number, crabs: number[]) =>
  crabs.reduce((fuel, c) => {
    const distance = Math.abs(c - desiredPosition);
    let cFuel = 0;
    let fuelCost = 1;

    for (let i = 0; i < distance; i++) {
      cFuel = cFuel + fuelCost;
      fuelCost = fuelCost + 1;
    }

    return fuel + cFuel;
  }, 0);
