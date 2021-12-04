import bingoSheets from "./bingoSheets";
import callNumbers from "./callNumbers";

type BingoNumber = {
  number: number;
  called: boolean;
};

type Line = BingoNumber[];

export type BingoSheet = { hasWon: boolean; lines: Line[] };

export const prepBingoSheets = (bingoSheets: number[][][]): BingoSheet[] =>
  bingoSheets.map((bingoSheet) => ({
    hasWon: false,
    lines: bingoSheet.map((line) =>
      line.map((number) => ({ number, called: false }))
    ),
  }));

const checkLine = (line: Line) => line.every((bn) => bn.called);
const changeDimension = (bingoSheet: BingoSheet): BingoSheet =>
  bingoSheet.lines.reduce(
    (acc, line, i) => {
      line.forEach((bn, i) => acc.lines[i].push(bn));
      return acc;
    },
    { hasWon: bingoSheet.hasWon, lines: [[], [], [], [], []] } as BingoSheet
  );

const checkSheet = (bingoSheet: BingoSheet): boolean => {
  const hasHorizontalLine = bingoSheet.lines.some(checkLine);
  const hasVerticalLine = changeDimension(bingoSheet).lines.some(checkLine);
  return hasHorizontalLine || hasVerticalLine ? true : false;
};

export const getScore = (
  bingoSheet: BingoSheet,
  callNumber: number
): number => {
  const unmarkedNumberSum = bingoSheet.lines
    .flatMap((line) => line.filter((bn) => !bn.called))
    .reduce((sum, bn) => sum + bn.number, 0);

  return unmarkedNumberSum * callNumber;
};

export const getDesiredSheetScore = (
  bingoSheets: BingoSheet[],
  callNumbers: number[],
  lastWin = false
): number => {
  let bingoCount = 0;
  let callNumber: number;
  let callNumberIndex = 0;
  let desiredSheetIndex: number;

  while (!lastWin ? bingoCount < 1 : bingoCount < bingoSheets.length) {
    callNumber = callNumbers[callNumberIndex];

    bingoSheets.forEach((bingoSheet, bingoSheetIndex) => {
      bingoSheet.lines.forEach((line) =>
        line.forEach((bn) => {
          if (bn.number === callNumber) {
            bn.called = true;
          }
        })
      );

      if (!bingoSheet.hasWon && checkSheet(bingoSheet)) {
        bingoCount++;
        bingoSheet.hasWon = true;
        desiredSheetIndex = bingoSheetIndex;
      }
    });

    callNumberIndex++;
  }

  return getScore(bingoSheets[desiredSheetIndex!], callNumber!);
};

const result = getDesiredSheetScore(prepBingoSheets(bingoSheets), callNumbers);

console.log(result);

const part2Result = getDesiredSheetScore(
  prepBingoSheets(bingoSheets),
  callNumbers,
  true
);

console.log("part2Result", part2Result);
