const { readFile, arraySum } = require("../utils");

const exampleFileName = "input_example";
const testFileName = "input";

const fileName = testFileName;

const signalStrengthes = { 20: 1, 60: 1, 100: 1, 140: 1, 180: 1, 220: 1 };

let currentCycle = 0;
let rigisterValue = 1;

function tick() {
  currentCycle++;

  if (signalStrengthes[currentCycle.toString()]) {
    signalStrengthes[currentCycle] = currentCycle * rigisterValue;
  }
}

function processAddX(x) {
  tick();
  tick();
  rigisterValue = rigisterValue + x;
}

function processNoop() {
  tick();
}

function processCommand(instruction) {
  const [command, x] = instruction.split(" ");

  if (command === "addx") {
    processAddX(Number(x));
  } else {
    processNoop();
  }
}

function main() {
  const lines = readFile(fileName);

  lines.forEach(processCommand);

  const sum = arraySum(Object.values(signalStrengthes));

  console.log(sum);
}

main();
