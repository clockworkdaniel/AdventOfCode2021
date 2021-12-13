import { coordinates, folds } from "./inputData";

export type Coordinate = [number, number];
export type Paper = ("#" | ".")[][];
export type Fold = ["x" | "y", number];

export const generatePaper = (coordinates: Coordinate[]): Paper => {
  const topX = coordinates.reduce((topX, [x]) => (x > topX ? x : topX), 0);
  const topY = coordinates.reduce((topY, [, y]) => (y > topY ? y : topY), 0);

  const paper: Paper = new Array(topY + 1)
    .fill(undefined)
    .map(() => new Array(topX + 1).fill("."));

  coordinates.forEach(([x, y]) => {
    paper[y][x] = "#";
  });

  return paper;
};

export const dividePaper = (
  [dimension, line]: Fold,
  paper: Paper
): [Paper, Paper] => {
  let paperA: Paper = [];
  let paperB: Paper = [];

  if (dimension === "y") {
    paperA = paper.slice(0, line);
    paperB = paper.slice(line + 1);
  }

  if (dimension === "x") {
    paperA = paper.map((y) => y.slice(0, line));
    paperB = paper.map((y) => y.slice(line + 1));
  }

  return [paperA, paperB];
};

export const foldPaper = (fold: Fold, paper: Paper) => {
  const [dimension] = fold;
  const [paperA, paperB] = dividePaper(fold, paper);

  const paperBReversed =
    dimension === "y" ? paperB.reverse() : paperB.map((y) => y.reverse());

  const newYLength = paperA.length;
  const newXLength = paperA[0].length;

  if (dimension === "y") {
    const difference = Math.abs(newYLength - paperB.length);

    if (newYLength < paperB.length) {
      paperBReversed.splice(0, difference);
    } else if (newYLength > paperB.length) {
      paperBReversed.unshift(
        ...new Array(difference).fill(new Array(newXLength).fill("."))
      );
    }
  }

  if (dimension === "x") {
    const difference = Math.abs(newXLength - paperB[0].length);

    if (newXLength < paperB[0].length) {
      paperBReversed.forEach((y) => y.splice(0, difference));
    } else if (newXLength > paperB[0].length) {
      paperBReversed.forEach((y) =>
        y.unshift(...new Array(difference).fill("."))
      );
    }
  }

  const mergedPaper = paperA.map((y, yi) =>
    y.map((x, xi) => (x === "#" ? x : paperBReversed[yi][xi]))
  );

  return mergedPaper;
};

export const countDots = (paper: Paper) =>
  paper.reduce((sum, y) => {
    let dots = 0;

    y.forEach((x) => {
      if (x === "#") {
        dots++;
      }
    });
    return sum + dots;
  }, 0);

const paper = generatePaper(coordinates);
const foldedPaper = foldPaper(folds[0], paper);

console.log(countDots(foldedPaper));

const part2Result = (() => {
  let paper = generatePaper(coordinates);

  folds.forEach((fold, i) => {
    paper = foldPaper(fold, paper);
  });

  return paper.map((y) => y.join(""));
})();

console.log(part2Result);
