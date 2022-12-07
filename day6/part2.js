const { readFile } = require("../utils");

const exampleFileName = "input_example";
const testFileName = "input";

const fileName = testFileName;

function isAllUnique(str) {
  const chars = str.split("");
  const uniqueChars = Array.from(new Set(chars));

  return chars.length === uniqueChars.length;
}

function main() {
  const lines = readFile(fileName);
  const [input] = lines;

  let counter = 14;

  while (counter <= input.length) {
    const lastFour = input.slice(counter - 14, counter);

    if (isAllUnique(lastFour)) break;

    counter++;
  }

  console.log(counter);
}

main();
