const { readFile } = require("../utils");

const exampleFileName = "input_example";
const testFileName = "input";

const fileName = testFileName;

function compareSections([section1, section2]) {
  const [from1, to1] = section1.split("-").map((num) => +num);
  const [from2, to2] = section2.split("-").map((num) => +num);

  if (from1 === from2 || to1 === to2) {
    return true;
  }

  const notOverlapping = to2 < from1 || from2 > to1;

  return !notOverlapping;
}

function main() {
  const lines = readFile(fileName);

  const overlapping = lines.filter((line) => compareSections(line.split(",")));

  console.log(overlapping.length);
}

main();
