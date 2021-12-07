import { getFishAtDay } from "./day6";

const testData = [3, 4, 3, 1, 2];

describe("getFishAtDay", () => {
  test("day 1", () => {
    expect(getFishAtDay(testData, 1)).toEqual([2, 3, 2, 0, 1]);
  });
  test("day 2", () => {
    expect(getFishAtDay(testData, 2)).toEqual([1, 2, 1, 6, 0, 8]);
  });
  test("day 5", () => {
    expect(getFishAtDay(testData, 5)).toEqual([5, 6, 5, 3, 4, 5, 6, 7, 7, 8]);
  });
  test("day 30", () => {
    expect(getFishAtDay(testData, 80).length).toBe(5934);
  });
});
