import { countInstancesOfLetter, getEntryValue, parseEntry } from "./day8-part2";

const exampleEntry = "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf";

const parsedEntry = parseEntry(exampleEntry);


test('countInstancesOfLetter', () => {
  expect(countInstancesOfLetter(parsedEntry.signalPatterns)).toEqual({a: 8, b: 9, c: 7, d:8, e:6, f:7, g:4})
});

test("getEntryValue", () => {
  expect(getEntryValue(parsedEntry)).toBe("5353");
});