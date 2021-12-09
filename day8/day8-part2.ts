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

type LetterInstances = { [key: string]: number };

export const countInstancesOfLetter = (
  signalPatterns: string[]
): LetterInstances => {
  const letterInstances: LetterInstances = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
  };

  Object.keys(letterInstances).forEach((letter: string) => {
    const regex = new RegExp(`${letter}`, "g");
    const matches = signalPatterns.join().match(regex);
    const count = matches ? matches.length : 0;
    letterInstances[letter] = count;
  });

  return letterInstances;
};

export const getEntryValue = ({ signalPatterns, digitValues }: Entry) => {
  const digitPatterns: string[] = new Array(10).fill("");

  const findByLengthAndRemoveFromSignalPatterns = (length: number): string => {
    const i = signalPatterns.findIndex((sp) => sp.length === length);
    const letter = signalPatterns[i];
    signalPatterns = signalPatterns.filter((sp) => sp !== letter);
    return letter;
  };

  const instancesOfLetter = countInstancesOfLetter(signalPatterns);

  // known
  digitPatterns[1] = findByLengthAndRemoveFromSignalPatterns(2);
  digitPatterns[4] = findByLengthAndRemoveFromSignalPatterns(4);
  digitPatterns[7] = findByLengthAndRemoveFromSignalPatterns(3);
  digitPatterns[8] = findByLengthAndRemoveFromSignalPatterns(7);

  let leftTop = "";
  let leftBottom = "";
  let rightBottom = "";

  Object.entries(instancesOfLetter).forEach(([letter, instances]) => {
    if (instances === 6) leftTop = letter;
    if (instances === 4) leftBottom = letter;
    if (instances === 9) rightBottom = letter;
  });

  const rightTop = digitPatterns[1].replace(rightBottom, "");

  const findBySegmenetAndRemoveFromSignalPatterns = (
    regexString: string,
    ofLength?: number
  ): string => {
    let letter = "";
    if (!ofLength) {
      letter = signalPatterns.find(
        (sp) => new RegExp(regexString).test(sp) === false
      )!;
    } else {
      letter = signalPatterns
        .filter((sp) => sp.length === ofLength)
        .find((sp) => new RegExp(regexString).test(sp) === false)!;
    }
    signalPatterns = signalPatterns.filter((sp) => sp !== letter);
    return letter;
  };

  digitPatterns[5] = findBySegmenetAndRemoveFromSignalPatterns(
    `${leftBottom}|${rightTop}`
  );

  digitPatterns[6] = findBySegmenetAndRemoveFromSignalPatterns(rightTop, 6);
  digitPatterns[9] = findBySegmenetAndRemoveFromSignalPatterns(leftBottom, 6); // not working
  digitPatterns[0] = findByLengthAndRemoveFromSignalPatterns(6);
  digitPatterns[3] = findBySegmenetAndRemoveFromSignalPatterns(leftBottom);
  digitPatterns[2] = signalPatterns[0];

  return Number(
    digitValues.reduce((output, dv) => {
      const i = digitPatterns
        .map((dp) => dp.split("").sort().join(""))
        .findIndex((dp) => dp === dv.split("").sort().join(""));
      return output + i;
    }, "")
  );
};

const parsedEntries = inputData.map((x) => parseEntry(x));

const result = parsedEntries.map(getEntryValue).reduce((sum, e) => sum + e, 0);

console.log(result);
