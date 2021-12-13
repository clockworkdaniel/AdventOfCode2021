import { Connection, getNextConnections, getPaths, Path } from "./day12";

const testData = [
  "dc-end",
  "HN-start",
  "start-kj",
  "dc-start",
  "dc-HN",
  "LN-dc",
  "HN-end",
  "kj-sa",
  "kj-HN",
  "kj-dc",
];

test("getPaths", () => {
  expect(getPaths(testData).sort()).toEqual([
    ["start", "HN", "dc", "HN", "end"],
    ["start", "HN", "dc", "HN", "kj", "HN", "end"],
    ["start", "HN", "dc", "end"],
    ["start", "HN", "dc", "kj", "HN", "end"],
    ["start", "HN", "end"],
    ["start", "HN", "kj", "HN", "dc", "HN", "end"],
    ["start", "HN", "kj", "HN", "dc", "end"],
    ["start", "HN", "kj", "HN", "end"],
    ["start", "HN", "kj", "dc", "HN", "end"],
    ["start", "HN", "kj", "dc", "end"],
    ["start", "dc", "HN", "end"],
    ["start", "dc", "HN", "kj", "HN", "end"],
    ["start", "dc", "end"],
    ["start", "dc", "kj", "HN", "end"],
    ["start", "kj", "HN", "dc", "HN", "end"],
    ["start", "kj", "HN", "dc", "end"],
    ["start", "kj", "HN", "end"],
    ["start", "kj", "dc", "HN", "end"],
    ["start", "kj", "dc", "end"],
  ]);
});

test("getNextConnections", () => {
  const connections: Connection[] = [
    ["dc", "end"],
    ["dc", "HN"],
    ["LN", "dc"],
    ["HN", "end"],
    ["kj", "sa"],
    ["kj", "HN"],
    ["kj", "dc"],
  ];

  const path: Path = ["start", "HN"];
  const path2: Path = ["start", "dc", "end"];
  const path3: Path = ["start", "HN", "dc"];

  expect(getNextConnections(connections, path)).toEqual([
    ["HN", "dc"],
    ["HN", "end"],
    ["HN", "kj"],
  ]);
  expect(getNextConnections(connections, path2)).toEqual([]);
  expect(getNextConnections(connections, path3)).toEqual([
    ["dc", "end"],
    ["dc", "HN"],
    ["dc", "LN"],
    ["dc", "kj"],
  ]);
});
