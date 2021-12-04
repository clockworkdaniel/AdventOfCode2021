import inputData from "./inputData";

const convertToDecimal = (binary: string): number => parseInt(binary, 2);

const invertBinary = (binary: string): string =>
  binary
    .split("")
    .map((bit) => (bit === "0" ? "1" : "0"))
    .join("");

const getMostCommonBit = (bits: string[]): string => {
  let zeroCount = 0;
  let oneCount = 0;

  bits.map((bit) => (bit === "0" ? zeroCount++ : oneCount++));

  return zeroCount > oneCount ? "0" : "1";
};

let bitIndex = 0;
let gammaRate = "";

while (inputData[0].charCodeAt(bitIndex)) {
  const pickedBits: string[] = inputData.map((binary) =>
    binary.charAt(bitIndex)
  );
  gammaRate = gammaRate + getMostCommonBit(pickedBits);
  bitIndex++;
}

const epsilonRate = invertBinary(gammaRate);

const result = convertToDecimal(gammaRate) * convertToDecimal(epsilonRate);

console.log("result", result);
