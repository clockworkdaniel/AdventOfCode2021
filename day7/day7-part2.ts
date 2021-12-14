import inputData from "./inputData";

export const getBestPosition = (positions: number[]): number => {
  positions.sort((a, b) => a - b);

  let mid = Math.floor(positions.length / 2);
  const midVal = positions[mid];

  const direction =
    calcFuel(midVal + 1, positions) < calcFuel(midVal - 1, positions) ? +1 : -1;

  let i = midVal;

  while (true) {
    const test = calcFuel(i, positions);
    const next = calcFuel(i + direction, positions);

    if (next > test) {
      break;
    }

    i++;
  }

  return i;
};

export const calcFuel = (desiredPosition: number, positions: number[]) =>
  positions.reduce((fuel, c) => {
    const distance = Math.abs(c - desiredPosition);
    let cFuel = 0;
    let fuelCost = 1;

    for (let i = 0; i < distance; i++) {
      cFuel = cFuel + fuelCost;
      fuelCost = fuelCost + 1;
    }

    return fuel + cFuel;
  }, 0);

console.log(calcFuel(getBestPosition(inputData), inputData));
