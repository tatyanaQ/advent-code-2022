const { readFile } = require("../utils");

const exampleFileName = "input_example";
const testFileName = "input";

const fileName = testFileName;

function initialArray(stacksPart) {
  const lines = stacksPart.split("\n");
  const stackNumbers = lines.pop();
  const stackCount = Number(stackNumbers[stackNumbers.length - 2]);

  const stacks = {};

  lines.forEach((line) => {
    for (let i = 1; i <= stackCount; i = i + 1) {
      if (!stacks[i]) {
        stacks[i] = [];
      }

      const crate = line[(i - 1) * 4 + 1];
      if (crate !== " ") {
        stacks[i] = stacks[i].concat(crate);
      }
    }
  });

  Object.keys(stacks).forEach((key) => stacks[key].reverse());

  return stacks;
}

function move(stacks, from, to) {
  const popped = stacks[from].pop();
  stacks[to].push(popped);
}

function main() {
  const [stacksPart, proceduresPart] = readFile(fileName, "\n\n");

  const stacks = initialArray(stacksPart);
  const procedures = proceduresPart.split("\n");

  procedures.forEach((procedure) => {
    const [_move, n, _from, from, _to, to] = procedure.split(" ");
    Array.from("0".repeat(n)).forEach(() => move(stacks, from, to));
  });

  const topStacks = Object.values(stacks).map(
    (stack) => stack[stack.length - 1]
  );

  console.log(topStacks.join(""));
}

main();
