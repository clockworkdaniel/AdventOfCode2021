import inputData from "./inputData";

type Entry = {
  signalPatterns: string[];
  digitValues: string[];
};

export const parseEntry = (s: string): Entry => {
  const [sp, dv] = s.split(" | ");
  const signalPatterns = sp.split(" ");
  const digitValues = dv.split(" ");
  return { signalPatterns, digitValues };
};

export const countEasyDigits = (entries: Entry[]): number => {
  const digitValues = entries.map(({ digitValues }) => digitValues).flat();
  let count = new Array(10).fill(0);

  digitValues.forEach((dv: string) => {
    if (dv.length !== 5 && dv.length !== 6) {
      count[dv.length]++;
    }
  });

  return count.reduce((sum, c) => sum + c, 0);
};

const parsedEntries = inputData.map((x) => parseEntry(x));

console.log("result", countEasyDigits(parsedEntries));
