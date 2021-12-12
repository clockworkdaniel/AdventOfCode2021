import inputData from "./inputData";

export const parseData = (o: string[]): number[][] =>
  o.map((o) => o.split("").map((s) => Number(s)));

export const countFlashes = (octopi: number[][]): number => {
  octopi.forEach((horizontal, y) => {
    horizontal.forEach((energy, x) => {
      const processAdjacentFlashes = (x: number, y: number) => {
        const relativePositions = {
          top: {
            energy: octopi[y - 1]?.[x],
            x,
            y: y - 1,
          },
          topRight: {
            energy: octopi[y - 1]?.[x + 1],
            x: x + 1,
            y: y - 1,
          },
          right: {
            energy: octopi[y]?.[x + 1],
            x: x + 1,
            y,
          },
          bottomRight: {
            energy: octopi[y + 1]?.[x + 1],
            x: x + 1,
            y: y + 1,
          },
          bottom: {
            energy: octopi[y + 1]?.[x],
            x,
            y: y + 1,
          },
          bottomLeft: {
            energy: octopi[y + 1]?.[x - 1],
            x: x - 1,
            y: y + 1,
          },
          left: {
            energy: octopi[y]?.[x - 1],
            x: x - 1,
            y,
          },
          topLeft: {
            energy: octopi[y - 1]?.[x - 1],
            x: x - 1,
            y: y - 1,
          },
        };

        return Object.values(relativePositions).forEach(({ energy, x, y }) => {
          if (typeof energy !== "undefined" && octopi[y][x] !== 10) {
            octopi[y][x]++;
            if (octopi[y][x] === 10) {
              processAdjacentFlashes(x, y);
            }
          }
        });
      };

      if (energy !== 10) {
        octopi[y][x]++;
        if (octopi[y][x] === 10) {
          processAdjacentFlashes(x, y);
        }
      }
    });
  });

  return octopi.reduce((flashes, octopiLine, y) => {
    let f = 0;

    octopiLine.forEach((o, x) => {
      if (o > 9) {
        f++;
        octopi[y][x] = 0;
      }
    });
    return flashes + f;
  }, 0);
};

export const findFlashesAtStep = (octopi: number[][], step: number) => {
  let flashes = 0;
  for (let s = 0; s < step; s++) {
    const newFlashes = countFlashes(octopi);
    flashes = flashes + newFlashes;
  }
  return flashes;
};

console.log(findFlashesAtStep(parseData(inputData), 100));

export const findIlluminatedSteps = (octopi: number[][]) => {
  let s = 0;

  const octopiLength = octopi.length * octopi[1].length;

  while (true) {
    s++;
    if (countFlashes(octopi) === octopiLength) {
      break;
    }
  }
  return s;
};

console.log(findIlluminatedSteps(parseData(inputData)));
