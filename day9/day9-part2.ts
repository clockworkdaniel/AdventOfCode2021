import inputData from "./inputData";

type LocationDetail = { height: number; counted: boolean };
type Location = { x: number; y: number; detail: LocationDetail };
type HeightMap = LocationDetail[][];

export const parseData = (hm: string[]): HeightMap =>
  hm.map((v) =>
    v.split("").map((s) => ({ counted: false, height: Number(s) }))
  );

const locationIsHit = (location: LocationDetail): boolean => {
  if (
    typeof location !== "undefined" &&
    location.height !== 9 &&
    location.counted === false
  ) {
    location.counted = true;
    return true;
  }
  return false;
};

export const findBasinSizes = (heightMap: HeightMap) => {
  const basins: number[] = heightMap.reduce((basins, horizontal, y) => {
    const basinSizes: number[] = [];

    horizontal.forEach((location, x) => {
      let basinSize = 0;

      const sizeBasin = (heightMap: HeightMap, x: number, y: number) => {
        const up: Location = {
          detail: heightMap[y - 1]?.[x],
          x,
          y: y - 1,
        };
        const right: Location = {
          detail: heightMap[y]?.[x + 1],
          x: x + 1,
          y,
        };
        const bottom: Location = {
          detail: heightMap[y + 1]?.[x],
          x,
          y: y + 1,
        };
        const left: Location = {
          detail: heightMap[y]?.[x - 1],
          x: x - 1,
          y,
        };

        return [up, right, bottom, left].forEach(
          ({ detail, x, y }: Location) => {
            if (locationIsHit(detail)) {
              basinSize++;
              sizeBasin(heightMap, x, y);
            }
          }
        );
      };

      if (locationIsHit(location)) {
        basinSize++;
        sizeBasin(heightMap, x, y);
        basinSizes.push(basinSize);
      }
    });

    return basins.concat(basinSizes);
  }, [] as number[]);

  return basins;
};

const basinSizes = findBasinSizes(parseData(inputData));

const result = basinSizes
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((acc, v) => acc * v, 1);

console.log(result);
