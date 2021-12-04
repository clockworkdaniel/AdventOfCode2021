import inputData from "./inputData";

type Position = { h: number; d: number };

const getNewPosition = (input: string[]): Position => {
  const position: Position = { h: 0, d: 0 };
  let aim = 0;

  input.map((v) => {
    const [command, change] = v.match(/\w+/g);
    const c = Number(change);

    switch (command) {
      case "forward":
        position.h = position.h + c;
        position.d = position.d + aim * c;
        break;
      case "down":
        aim = aim + c;
        break;
      case "up":
        aim = aim - c;
        break;
    }
  });

  return position;
};

const resultPosition = getNewPosition(inputData);

const result = resultPosition.h * resultPosition.d;

console.log("result", result);
