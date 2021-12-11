import inputData from "./inputData";

type HeightMap = number[][];

export const parseData = (hm: string[]): HeightMap =>
  hm.map((v) => v.split("").map((s) => Number(s)));

export const findLowPointRiskLevels = (heightMap: number[][]) => {
  const lowPoints: number[] = heightMap.reduce((lowPoints, horizontal, y) => {
    const lp: number[] = [];

    horizontal.forEach((location, x) => {
      const loc = Number(location);
      const up = heightMap[y - 1]?.[x];
      const right = heightMap[y]?.[x + 1];
      const bottom = heightMap[y + 1]?.[x];
      const left = heightMap[y]?.[x - 1];

      if (
        (typeof up === "undefined" || loc < Number(up)) &&
        (typeof right === "undefined" || loc < Number(right)) &&
        (typeof bottom === "undefined" || loc < Number(bottom)) &&
        (typeof left === "undefined" || loc < Number(left))
      ) {
        lp.push(loc);
      }
    });

    return lowPoints.concat(lp);
  }, []);

  return lowPoints.map((v) => v + 1);
};

const lowPointRiskLevels = findLowPointRiskLevels(parseData(inputData));

const result = lowPointRiskLevels.reduce((sum, v) => sum + v, 0);

console.log(result);
