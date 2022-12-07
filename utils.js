const fs = require("fs");

function readFile(fileName) {
  const inputFile = fs.readFileSync(`./${fileName}`, {
    encoding: "utf-8",
  });

  return inputFile.split("\n");
}

function arraySum(array) {
  return array.reduce((sum, item) => item + sum, 0);
}

module.exports = {
  readFile,
  arraySum,
};
