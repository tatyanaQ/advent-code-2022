const { readFile } = require("../utils");

const exampleFileName = "input_example";
const testFileName = "input";

const fileName = testFileName;

let grid = [];

function lessThen(item, value) {
  return item < value;
}

function isVisibleHorizontally(i, j) {
  const horizontal = grid[i];

  if (j === 0 || j === horizontal.length - 1) {
    return true;
  }

  const leftTrees = horizontal.slice(0, j);
  const rightTrees = horizontal.slice(j + 1);

  const currentTree = horizontal[j];

  return (
    leftTrees.every((tree) => lessThen(tree, currentTree)) ||
    rightTrees.every((tree) => lessThen(tree, currentTree))
  );
}

function isVisibleVertically(i, j) {
  if (i === 0 || i === grid.length - 1) {
    return true;
  }

  const topTrees = grid.slice(0, i).map((vertical) => vertical[j]);
  const bottomTrees = grid.slice(i + 1).map((vertical) => vertical[j]);

  const currentTree = grid[i][j];

  return (
    topTrees.every((tree) => lessThen(tree, currentTree)) ||
    bottomTrees.every((tree) => lessThen(tree, currentTree))
  );
}

function main() {
  const lines = readFile(fileName);

  grid = lines.map((line) => line.split("").map(Number));

  let counter = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (isVisibleHorizontally(i, j) || isVisibleVertically(i, j)) {
        counter++;
      }
    }
  }

  console.log(counter);
}

main();
