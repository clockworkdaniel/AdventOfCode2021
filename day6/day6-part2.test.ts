import { getFishAtDay } from "./day6-part2";

const testData = [3, 4, 3, 1, 2];

describe("getFishAtDay", () => {
  test("day 1", () => {
    expect(getFishAtDay(1, testData)).toBe([2, 3, 2, 0, 1].length.toString());
  });
  test("day 2", () => {
    expect(getFishAtDay(2, testData)).toBe(
      [1, 2, 1, 6, 0, 8].length.toString()
    );
  });
  test("day 5", () => {
    expect(getFishAtDay(5, testData)).toBe(
      [5, 6, 5, 3, 4, 5, 6, 7, 7, 8].length.toString()
    );
  });
  test("day 30", () => {
    expect(getFishAtDay(80, testData)).toBe("5934");
  });
});
