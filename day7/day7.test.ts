import { calcFuel, getBestPosition } from "./day7";

const testData = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

test("getBestPosition", () => {
  expect(getBestPosition(testData)).toBe(2);
});

test("calcFuel", () => {
  expect(calcFuel(2, testData)).toBe(37);
});
