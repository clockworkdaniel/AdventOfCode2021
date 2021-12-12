import {
  getAllExpectedClosers,
  getAutoCompleteScore,
  getCorruptedLinesIllegalChars,
  getErrorScore,
  getFirstIllegalCharacter,
  Right,
} from "./day10";

const testData = [
  "[({(<(())[]>[[{[]{<()<>>",
  "[(()[<>])]({[<{<<[]>>(",
  "{([(<{}[<>[]}>{[]{[(<()>",
  "(((({<>}<{<{<>}{[]{[]{}",
  "[[<[([]))<([[{}[[()]]]",
  "[{[{({}]{}}([{[{{{}}([]",
  "{<[[]]>}<{[{[{[]{()[[[]",
  "[<(<(<(<{}))><([]([]()",
  "<{([([[(<>()){}]>(<<{{",
  "<{([{{}}[<[[[<>{}]]]>[]]",
];

test("getFirstIllegalCharacter", () => {
  expect(getFirstIllegalCharacter(testData[0]).illegalClose).toEqual(undefined);
  expect(getFirstIllegalCharacter(testData[2]).illegalClose).toEqual("}");
  expect(getFirstIllegalCharacter(testData[4]).illegalClose).toEqual(")");
  expect(getFirstIllegalCharacter(testData[5]).illegalClose).toEqual("]");
});

test("getCorruptedLinesIllegalChars", () => {
  expect(getCorruptedLinesIllegalChars(testData)).toEqual([
    "}",
    ")",
    "]",
    ")",
    ">",
  ]);
});

test("getErrorScore", () => {
  expect(getErrorScore(testData)).toBe(26397);
});

const expectedClosers = [
  "}}]])})]",
  ")}>]})",
  "}}>}>))))",
  "]]}}]}]}>",
  "])}>",
];

test("getAllExpectedClosers", () => {
  expect(getAllExpectedClosers(testData).map((l) => l.join(""))).toEqual(
    expectedClosers
  );
});

test("getAutoCompleteScore", () => {
  expect(
    getAutoCompleteScore(expectedClosers.map((ec) => ec.split("")) as Right[][])
  ).toBe(288957);
});
