import inputData from "./inputData";

type Point = { x: number; y: number };
type LineSegment = {
  start: Point;
  end: Point;
};

export const parseLineSegment = (ls: string): LineSegment => {
  const matches = ls.match(/\d+/g)!;
  const [xs, ys, xe, ye] = matches.map((n) => Number(n));

  return { start: { x: xs, y: ys }, end: { x: xe, y: ye } };
};

const dataParsed: LineSegment[] = inputData.map((ls) => parseLineSegment(ls));

export const filterLineSegmements = (ls: LineSegment[]) =>
  ls.filter(({ start, end }) => start.x === end.x || start.y === end.y);

const filteredLineSegments = filterLineSegmements(dataParsed);

export type Diagram = number[][];

export const getPointsToAffect = ({ start, end }: LineSegment): Point[] => {
  let xChange = end.x - start.x;
  let yChange = end.y - start.y;

  let x = start.x;
  let y = start.y;

  return [start].concat(
    new Array(Math.max(Math.abs(xChange), Math.abs(yChange)))
      .fill(0)
      .map(() => {
        if (Math.sign(xChange) === 1) {
          x++;
          xChange--;
        }
        if (Math.sign(xChange) === -1) {
          x--;
          xChange++;
        }

        if (Math.sign(yChange) === 1) {
          y++;
          yChange--;
        }
        if (Math.sign(yChange) === -1) {
          y--;
          yChange++;
        }

        return { x, y };
      })
  );
};

export const generateDiagram = (lineSegments: LineSegment[]): Diagram => {
  let xLength = 0;
  let yLength = 0;

  lineSegments.forEach(({ start, end }) => {
    xLength = Math.max(xLength, start.x, end.x);
    yLength = Math.max(yLength, start.y, end.y);
  });

  const d: Diagram = new Array(yLength + 1)
    .fill(undefined)
    .map(() => new Array(xLength + 1).fill(0));

  lineSegments.forEach((ls) => {
    const pointsToAffect = getPointsToAffect(ls);

    pointsToAffect.forEach((point: Point) => {
      d[point.y][point.x] = d[point.y][point.x] + 1;
    });
  });

  return d;
};

const diagram = generateDiagram(filteredLineSegments);

export const getResult = (diagram: Diagram) =>
  diagram.map((y) => y.filter((x) => x > 1)).flat().length;

const result = getResult(diagram);

console.log("result", result);

const part2Diagram = generateDiagram(dataParsed);

const part2Result = getResult(part2Diagram);

console.log("part2Result", part2Result);
