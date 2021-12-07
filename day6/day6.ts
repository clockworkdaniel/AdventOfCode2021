import startingFish from "./inputData";

type Lanternfish = number;

export const getFishAtDay = (
  oldFish: Lanternfish[],
  countDay: number
): Lanternfish[] => {
  let day = 0;
  let youngFish: Lanternfish[] = [];

  while (day < countDay) {
    let newYoungFish: Lanternfish[] = [];

    oldFish = oldFish.map((d) => {
      if (d === 0) {
        newYoungFish.push(8);
        return 6;
      }

      return d - 1;
    });

    youngFish = youngFish
      .map((d) => {
        if (d === 0) {
          oldFish.push(6);
          newYoungFish.push(8);
          return undefined;
        }
        return d - 1;
      })
      .filter((d) => typeof d !== "undefined") as Lanternfish[];

    youngFish = youngFish.concat(newYoungFish);
    day++;
  }

  return oldFish.concat(youngFish);
};

const fishAt80 = getFishAtDay(startingFish, 80);

console.log("result", fishAt80.flat().length);
