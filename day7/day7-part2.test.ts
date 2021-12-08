import { calcFuel, getBestPosition } from "./day7-part2";

const testData = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

test("getBestPosition", () => {
  expect(getBestPosition(testData)).toBe(5);
});

test("calcFuel", () => {
  expect(calcFuel(5, testData)).toBe(168);
});
