import inputData from "./inputData";

type Left = "(" | "[" | "{" | "<";
export type Right = ")" | "]" | "}" | ">";

type Pair = {
  l: Left;
  r: Right;
  ep: number;
  ap: number;
};

const pairs: Pair[] = [
  {
    l: "(",
    r: ")",
    ep: 3,
    ap: 1,
  },
  {
    l: "[",
    r: "]",
    ep: 57,
    ap: 2,
  },
  {
    l: "{",
    r: "}",
    ep: 1197,
    ap: 3,
  },
  {
    l: "<",
    r: ">",
    ep: 25137,
    ap: 4,
  },
];

const openers = pairs.map(({ l }) => l);
const closers = pairs.map(({ r }) => r);

type LineAnalysis = {
  illegalClose: Right | undefined;
  expectedClosers: Right[];
};

export const getFirstIllegalCharacter = (line: string): LineAnalysis => {
  const expectedClosers: Right[] = [];
  let illegalClose: Right | undefined;

  const l = line.split("") as (Left | Right)[];

  for (let i = 0; i < l.length; i++) {
    const x = l[i];
    const validCloser = expectedClosers[expectedClosers.length - 1];

    const openerIndex = openers.indexOf(x as Left);

    if (openerIndex !== -1) {
      expectedClosers.push(closers[openerIndex]);
    } else if (x === validCloser) {
      expectedClosers.pop();
    } else if (x !== validCloser) {
      illegalClose = x as Right;
      break;
    }
  }

  return { illegalClose, expectedClosers };
};

export const getCorruptedLinesIllegalChars = (lines: string[]): Right[] =>
  lines.reduce((chars, line) => {
    const { illegalClose } = getFirstIllegalCharacter(line);
    return illegalClose ? chars.concat(illegalClose) : chars;
  }, [] as Right[]);

export const getErrorScore = (lines: string[]): number =>
  getCorruptedLinesIllegalChars(lines).reduce(
    (sum, char) => pairs.find(({ r }) => r === char)!.ep + sum,
    0
  );

console.log(getErrorScore(inputData));

export const getAllExpectedClosers = (lines: string[]): Right[][] =>
  lines.reduce((ec, line) => {
    const { illegalClose, expectedClosers } = getFirstIllegalCharacter(line);
    return !illegalClose ? [...ec, expectedClosers.reverse()] : ec;
  }, [] as Right[][]);

export const getAutoCompleteScore = (expectedClosers: Right[][]): number =>
  expectedClosers
    .map((ec) =>
      ec.reduce(
        (score, closer) => score * 5 + pairs.find(({ r }) => r === closer)!.ap,
        0
      )
    )
    .sort((a, b) => a - b)[Math.floor(expectedClosers.length / 2)];

console.log(getAutoCompleteScore(getAllExpectedClosers(inputData)));
