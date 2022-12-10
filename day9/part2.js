const { readFile } = require("../utils");

const exampleFileName = "input_example";
const testFileName = "input";

const fileName = testFileName;

let knots = Object.fromEntries(
  "a"
    .repeat(10)
    .split("")
    .map((_, index) => [index.toString(), { x: 0, y: 0 }])
);
const visitedCoords = [];

function isTailAround(head, tail) {
  return (
    tail.x >= head.x - 1 &&
    tail.x <= head.x + 1 &&
    tail.y >= head.y - 1 &&
    tail.y <= head.y + 1
  );
}

function singleMove({ x, y }, direction) {
  switch (direction) {
    case "R":
      return { x: x + 1, y };
    case "U":
      return { x, y: y + 1 };
    case "L":
      return { x: x - 1, y };
    case "D":
      return { x, y: y - 1 };
  }
}

function pushCoord({ x, y }) {
  visitedCoords.push(`${x};${y}`);
  // console.log(x, y);
}

function moveNextKnot(headIndex, tailIndex) {
  let head = knots[headIndex];
  let tail = knots[tailIndex];

  const ifTail = tailIndex === Object.keys(knots).slice(-1)[0];

  if (!isTailAround(head, tail)) {
    if (head.x === tail.x) {
      const step = head.y > tail.y ? "U" : "D";
      tail = singleMove(tail, step);
      knots[tailIndex] = tail;
      ifTail && pushCoord(tail);

      return;
    }

    if (head.y === tail.y) {
      const step = head.x > tail.x ? "R" : "L";
      tail = singleMove(tail, step);
      knots[tailIndex] = tail;
      ifTail && pushCoord(tail);

      return;
    }

    if (head.x > tail.x && head.y > tail.y) {
      tail = singleMove(tail, "R");
      tail = singleMove(tail, "U");
      knots[tailIndex] = tail;
      ifTail && pushCoord(tail);

      return;
    }

    if (head.x < tail.x && head.y > tail.y) {
      tail = singleMove(tail, "L");
      tail = singleMove(tail, "U");
      knots[tailIndex] = tail;
      ifTail && pushCoord(tail);

      return;
    }

    if (head.x < tail.x && head.y < tail.y) {
      tail = singleMove(tail, "L");
      tail = singleMove(tail, "D");
      knots[tailIndex] = tail;
      ifTail && pushCoord(tail);

      return;
    }

    if (head.x > tail.x && head.y < tail.y) {
      tail = singleMove(tail, "R");
      tail = singleMove(tail, "D");
      knots[tailIndex] = tail;
      ifTail && pushCoord(tail);

      return;
    }
  } else {
    // ifTail && console.log("not moving");
  }
}

function move({ direction, moves }) {
  "a"
    .repeat(moves)
    .split("")
    .forEach(() => {
      let head = knots["0"];
      head = singleMove(head, direction);
      knots["0"] = head;

      Object.keys(knots)
        .slice(0, -1)
        .forEach((headIndex) =>
          moveNextKnot(headIndex, (+headIndex + 1).toString())
        );
    });
}

function main() {
  const lines = readFile(fileName);

  pushCoord(knots["9"]);

  lines.forEach((line) => {
    const [direction, moves] = line.split(" ");

    move({ direction, moves: +moves });
  });

  const unique = Array.from(new Set(visitedCoords));

  console.log(unique.length);
}

main();
