const { readFile } = require("./utils");

const exampleFileName = "input_example";
const testFileName = "input";

const fileName = testFileName;

function main() {
  const lines = readFile(fileName);
}

main();
