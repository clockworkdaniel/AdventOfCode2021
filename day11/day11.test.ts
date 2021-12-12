import {
  countFlashes,
  findFlashesAtStep,
  findIlluminatedSteps,
  parseData,
} from "./day11";

const testData = ["11111", "19991", "19191", "19991", "11111"];

test("countFlashes", () => {
  const octopi = parseData(testData);

  expect(countFlashes(octopi)).toBe(9);
});

const testData2 = [
  "5483143223",
  "2745854711",
  "5264556173",
  "6141336146",
  "6357385478",
  "4167524645",
  "2176841721",
  "6882881134",
  "4846848554",
  "5283751526",
];

test("findFlashesAtStep", () => {
  expect(findFlashesAtStep(parseData(testData2), 10)).toBe(204);
  expect(findFlashesAtStep(parseData(testData2), 100)).toBe(1656);
});

test("findIlluminatedStep", () => {
  expect(findIlluminatedSteps(parseData(testData2))).toBe(195);
});
