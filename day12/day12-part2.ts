import inputData from "./inputData";

export type Path = string[];
export type Connection = [string, string];

const connectionHasCave = (connection: Connection, cave: string): boolean =>
  !!connection.find((x) => x === cave);

declare global {
  interface Array<T> {
    orderDesiredCaveFirst(cave: string): Array<T>;
  }
}

Array.prototype.orderDesiredCaveFirst = function (cave: string) {
  return this.map((connection) => {
    const otherCave = connection.filter((c: string) => c !== cave);
    return [cave, ...otherCave];
  });
};

const isSmallCave = (cave: string) => cave === cave.toLowerCase();

export const getNextConnections = (
  connections: Connection[],
  path: Path
): Connection[] => {
  const last = path.at(-1) as string;
  if (last === "end") {
    return [];
  }
  const smallCaves = path.filter(isSmallCave);
  const pathHasSmallCaveDoubleVisit =
    [...new Set(smallCaves)].length !== smallCaves.length;

  return connections
    .filter((c) => connectionHasCave(c, last))
    .orderDesiredCaveFirst(last)
    .filter(
      ([, b]) =>
        !isSmallCave(b) ||
        !pathHasSmallCaveDoubleVisit ||
        !path.find((x) => x === b)
    );
};

export const getPaths = (caveConnections: string[]) => {
  const connections: Connection[] = caveConnections.map(
    (cc) => cc.split("-") as Connection
  );

  const starts: Connection[] = connections
    .reduceRight(
      (starts, c, i) =>
        connectionHasCave(c, "start")
          ? [...starts, ...connections.splice(i, 1)]
          : starts,
      [] as Connection[]
    )
    .orderDesiredCaveFirst("start");

  let paths: (Path | undefined)[] = [...starts];

  while (paths.some((p) => p?.at(-1) !== "end")) {
    paths.forEach((path, pi) => {
      if (typeof path === "undefined") return [];

      const nextConnections = getNextConnections(connections, path);

      if (!nextConnections.length && path?.at(-1) !== "end") {
        paths[pi] = undefined;
        return;
      }

      const p = [...path];

      nextConnections.forEach(([, b], i) => {
        if (i === 0) {
          path.push(b);
        } else {
          paths.push([...p, b]);
        }
      });
    });

    paths = paths.filter(Boolean);
  }

  return paths.sort();
};

console.log(getPaths(inputData).length);
