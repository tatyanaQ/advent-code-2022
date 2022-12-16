const { readFile, arraySum } = require("../utils");

const exampleFileName = "input_example";
const testFileName = "input";

const fileName = testFileName;

let currentCycle = 0;
let rigisterValue = 1;
let position = 0;
const output = [];

function tick() {
  currentCycle++;

  if (position <= rigisterValue + 1 && position >= rigisterValue - 1) {
    output.push("#");
  } else {
    output.push(".");
  }

  position++;

  if (position % 40 === 0) {
    position = 0;
  }
}

function processAddX(x) {
  tick();
  tick();
  rigisterValue = rigisterValue + x;
}

function processNoop(index) {
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

function draw() {
  for (let i = 0; i < output.length / 40; i++) {
    const line = output.slice(i * 40, (i + 1) * 40);
    console.log(line.join(""));
  }
}

function main() {
  const lines = readFile(fileName);

  lines.forEach(processCommand);

  draw();
}

main();
