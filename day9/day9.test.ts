import { findLowPointRiskLevels, parseData } from "./day9";

const testData = [
  "2199943210",
  "3987894921",
  "9856789892",
  "8767896789",
  "9899965678",
];

test("findLowPoints", () => {
  expect(findLowPointRiskLevels(parseData(testData))).toEqual([2, 1, 6, 6]);
});
