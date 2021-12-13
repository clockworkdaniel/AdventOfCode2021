import { Connection, getNextConnections, getPaths, Path } from "./day12-part2";

const testData = ["start-A", "start-b", "A-c", "A-b", "b-d", "A-end", "b-end"];

test("getPaths", () => {
  expect(getPaths(testData).sort()).toEqual([
    ["start", "A", "b", "A", "b", "A", "c", "A", "end"],
    ["start", "A", "b", "A", "b", "A", "end"],
    ["start", "A", "b", "A", "b", "end"],
    ["start", "A", "b", "A", "c", "A", "b", "A", "end"],
    ["start", "A", "b", "A", "c", "A", "b", "end"],
    ["start", "A", "b", "A", "c", "A", "c", "A", "end"],
    ["start", "A", "b", "A", "c", "A", "end"],
    ["start", "A", "b", "A", "end"],
    ["start", "A", "b", "d", "b", "A", "c", "A", "end"],
    ["start", "A", "b", "d", "b", "A", "end"],
    ["start", "A", "b", "d", "b", "end"],
    ["start", "A", "b", "end"],
    ["start", "A", "c", "A", "b", "A", "b", "A", "end"],
    ["start", "A", "c", "A", "b", "A", "b", "end"],
    ["start", "A", "c", "A", "b", "A", "c", "A", "end"],
    ["start", "A", "c", "A", "b", "A", "end"],
    ["start", "A", "c", "A", "b", "d", "b", "A", "end"],
    ["start", "A", "c", "A", "b", "d", "b", "end"],
    ["start", "A", "c", "A", "b", "end"],
    ["start", "A", "c", "A", "c", "A", "b", "A", "end"],
    ["start", "A", "c", "A", "c", "A", "b", "end"],
    ["start", "A", "c", "A", "c", "A", "end"],
    ["start", "A", "c", "A", "end"],
    ["start", "A", "end"],
    ["start", "b", "A", "b", "A", "c", "A", "end"],
    ["start", "b", "A", "b", "A", "end"],
    ["start", "b", "A", "b", "end"],
    ["start", "b", "A", "c", "A", "b", "A", "end"],
    ["start", "b", "A", "c", "A", "b", "end"],
    ["start", "b", "A", "c", "A", "c", "A", "end"],
    ["start", "b", "A", "c", "A", "end"],
    ["start", "b", "A", "end"],
    ["start", "b", "d", "b", "A", "c", "A", "end"],
    ["start", "b", "d", "b", "A", "end"],
    ["start", "b", "d", "b", "end"],
    ["start", "b", "end"],
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
  const path4: Path = ["start", "HN", "dc", "HN"];
  const path5: Path = ["start", "HN", "dc", "HN", "dc", "HN"];
  const path6: Path = ["start", "HN", "dc", "HN", "dc", "HN", "kj", "sa"];

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
  expect(getNextConnections(connections, path4)).toEqual([
    ["HN", "dc"],
    ["HN", "end"],
    ["HN", "kj"],
  ]);
  expect(getNextConnections(connections, path5)).toEqual([
    ["HN", "end"],
    ["HN", "kj"],
  ]);
  expect(getNextConnections(connections, path6)).toEqual([]);
});
