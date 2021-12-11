import { findBasinSizes, parseData } from "./day9-part2";

const testData = [
  "2199943210",
  "3987894921",
  "9856789892",
  "8767896789",
  "9899965678",
];

test("findBasinSizes", () => {
  expect(findBasinSizes(parseData(testData))).toEqual([3, 9, 14, 9]);
});
