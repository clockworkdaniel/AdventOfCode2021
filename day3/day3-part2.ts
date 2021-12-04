import inputData from "./inputData";

const convertToDecimal = (binary: string): number => parseInt(binary, 2);

type Criteria = "oxygen" | "CO2";
type Bit = "0" | "1";

const getCommonBitByCriteria = (bits: Bit[], criteria: Criteria): Bit => {
  let zeroCount = 0;
  let oneCount = 0;

  const equalCommonalityBit = criteria === "oxygen" ? "1" : "0";

  bits.map((bit) => (bit === "0" ? zeroCount++ : oneCount++));

  if (zeroCount === oneCount) {
    return equalCommonalityBit;
  }

  if (criteria === "oxygen") {
    return zeroCount > oneCount ? "0" : "1";
  } else {
    return zeroCount > oneCount ? "1" : "0";
  }
};

const getRatingBinary = (binaries: string[], criteria: Criteria): string => {
  let bitIndex = 0;

  while (binaries.length > 1) {
    const pickedBits = binaries.map((binary) =>
      binary.charAt(bitIndex)
    ) as Bit[];
    const bit = getCommonBitByCriteria(pickedBits, criteria);
    binaries = binaries.filter((binary) => {
      return binary.charAt(bitIndex) === bit;
    });
    bitIndex++;
  }

  return binaries[0];
};

let oxygenGeneratorRating = getRatingBinary(inputData, "oxygen");
let CO2ScrubberRating = getRatingBinary(inputData, "CO2");

const result =
  convertToDecimal(oxygenGeneratorRating) * convertToDecimal(CO2ScrubberRating);

console.log("result", result);
