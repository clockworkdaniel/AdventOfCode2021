import inputData from "./inputData";

export const getFishAtDay = (days: number, fish: number[]): string => {
  const fishByDay: bigint[] = fish.reduce((acc, f) => {
    acc[f] = acc[f] + 1n;
    return acc;
  }, new Array(9).fill(0n));

  let day = 0;

  while (day < days) {
    let births = 0n;

    fishByDay.forEach((fish: bigint, i, a) => {
      if (i === 0) {
        births = fish;
      } else {
        a[i - 1] = a[i - 1] + fish;
      }
      a[i] = a[i] - fish;
    });

    if (births) {
      fishByDay[6] = fishByDay[6] + births!;
      fishByDay[8] = fishByDay[8] + births!;
    }

    day++;
  }

  return fishByDay
    .reduce((acc: bigint, f: bigint) => (acc = acc + f), 0n)
    .toString();
};

console.log(getFishAtDay(256, inputData).toString());
