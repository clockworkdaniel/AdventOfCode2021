import {
  Diagram,
  filterLineSegmements,
  generateDiagram,
  getPointsToAffect,
  getResult,
  parseLineSegment,
} from "./day5";

test("parseLineSegment", () => {
  const testLineSegment = "589,528 -> 968,528";

  expect(parseLineSegment(testLineSegment)).toEqual({
    start: { x: 589, y: 528 },
    end: { x: 968, y: 528 },
  });
});

test("getPointsToAffect", () => {
  const ls1 = { start: { x: 7, y: 0 }, end: { x: 7, y: 4 } };
  expect(getPointsToAffect(ls1)).toEqual([
    { x: 7, y: 0 },
    { x: 7, y: 1 },
    { x: 7, y: 2 },
    { x: 7, y: 3 },
    { x: 7, y: 4 },
  ]);

  const ls2 = { start: { x: 3, y: 4 }, end: { x: 1, y: 4 } };
  expect(getPointsToAffect(ls2)).toEqual([
    { x: 3, y: 4 },
    { x: 2, y: 4 },
    { x: 1, y: 4 },
  ]);
});

const diagram: Diagram = [
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 2, 1, 1, 1, 2, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 2, 2, 1, 1, 1, 0, 0, 0, 0],
];

test("generateDiagram", () => {
  const testData = [
    "0,9 -> 5,9",
    "8,0 -> 0,8",
    "9,4 -> 3,4",
    "2,2 -> 2,1",
    "7,0 -> 7,4",
    "6,4 -> 2,0",
    "0,9 -> 2,9",
    "3,4 -> 1,4",
    "0,0 -> 8,8",
    "5,5 -> 8,2",
  ];

  const filteredLineSegments = filterLineSegmements(
    testData.map((ls) => parseLineSegment(ls))
  );

  expect(generateDiagram(filteredLineSegments)).toEqual(diagram);
});

test("getResult", () => {
  expect(getResult(diagram)).toBe(5);
});
