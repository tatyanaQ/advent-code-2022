const { readFile } = require("../utils");

const exampleFileName = "input_example";
const testFileName = "input";

const fileName = testFileName;

let grid = [];

function higherOrEqualThen(item, value) {
  return item >= value;
}

function horizontalViewingDistance(i, j) {
  const horizontal = grid[i];

  if (j === 0 || j === horizontal.length - 1) {
    return { left: 0, right: 0 };
  }

  const leftTrees = horizontal.slice(0, j).reverse();
  const rightTrees = horizontal.slice(j + 1);

  const currentTree = horizontal[j];

  const leftStopperIndex = leftTrees.findIndex((tree) =>
    higherOrEqualThen(tree, currentTree)
  );
  const rightStopperIndex = rightTrees.findIndex((tree) =>
    higherOrEqualThen(tree, currentTree)
  );

  return {
    left: leftStopperIndex === -1 ? leftTrees.length : leftStopperIndex + 1,
    right: rightStopperIndex === -1 ? rightTrees.length : rightStopperIndex + 1,
  };
}

function verticalViewingDistance(i, j) {
  if (i === 0 || i === grid.length - 1) {
    return { top: 0, bottom: 0 };
  }

  const topTrees = grid.slice(0, i).map((vertical) => vertical[j]).reverse();
  const bottomTrees = grid.slice(i + 1).map((vertical) => vertical[j]);

  const currentTree = grid[i][j];

  const topStopperIndex = topTrees.findIndex((tree) =>
    higherOrEqualThen(tree, currentTree)
  );
  const bottomStopperIndex = bottomTrees.findIndex((tree) =>
    higherOrEqualThen(tree, currentTree)
  );

  return {
    top: topStopperIndex === -1 ? topTrees.length : topStopperIndex + 1,
    bottom: bottomStopperIndex === -1 ? bottomTrees.length : bottomStopperIndex + 1,
  };
}

function main() {
  const lines = readFile(fileName);

  grid = lines.map((line) => line.split("").map(Number));

  let max = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const { left, right } = horizontalViewingDistance(i, j);
      if (!left || !right) continue;

      const { top, bottom } = verticalViewingDistance(i, j);
      if (!top || !bottom) continue;

      const scenicScore = left * right * top * bottom;

      if (scenicScore > max) {
        max = scenicScore;
      }
    }
  }

  console.log(max);
}

main();
