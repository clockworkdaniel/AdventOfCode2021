import inputData from "./inputData";

const countIncreases = (input: number[]): number =>
  input
    .map((v, i, a) => {
      if (i === 0) return "N/A";
      if (v > a[i - 1]) return "increased";
      return "decreased";
    })
    .filter((change) => change === "increased").length;

const result = countIncreases(inputData);

console.log("result", result);

const slidingTotals = inputData
  .map((v, i, a) => {
    const first = v;
    const second = a[i + 1];
    const third = a[i + 2];

    if (!third) return undefined;

    return first + second + third;
  })
  .filter((v) => typeof v !== undefined) as number[];

const slidingResult = countIncreases(slidingTotals);

console.log("slidingResult", slidingResult);
