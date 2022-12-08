const path = require("path");
const { readFile, arraySum } = require("../utils");

const exampleFileName = "input_example";
const testFileName = "input";

const fileName = testFileName;

const content = { "/": {} };

let cwd = "/";

function processCd(command) {
  const dir = command.replace("$ cd ", "");

  switch (dir) {
    case "/":
      cwd = "/";
      break;
    case "..":
      cwd = path.join(cwd, "/..");
      break;
    default:
      cwd = path.join(cwd, dir);
  }
}

function getFullName(name) {
  return path.join(cwd, name);
}

function processLs(command, output) {
  const names = output.map((lsOutput) => {
    const [dirOrSize, name] = lsOutput.split(" ");

    const fullName = getFullName(name);

    if (dirOrSize === "dir") {
      return fullName;
    }

    content[fullName] = +dirOrSize;
    return fullName;
  });

  content[cwd] = names;
}

function processCommand(lines) {
  const [command, ...output] = lines;

  if (command.startsWith("$ cd ")) {
    return processCd(command, output);
  }

  return processLs(command, output);
}

function calculateByName(name) {
  if (typeof content[name] === "number") {
    return content[name];
  }

  return calculateDir(content[name]);
}

function calculateDir(names) {
  const sizes = names.map(calculateByName);
  return arraySum(sizes);
}

function main() {
  const lines = readFile(fileName);

  let commandLinesBuffer = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("$ ")) {
      if (commandLinesBuffer.length) {
        processCommand(commandLinesBuffer);
      }

      commandLinesBuffer = [];
    }

    commandLinesBuffer.push(line);

    if (i === lines.length - 1) {
      processCommand(commandLinesBuffer);
    }
  }

  const dirs = Object.keys(content).filter((name) =>
    Array.isArray(content[name])
  );

  const sizeMap = Object.fromEntries(
    dirs.map((dir) => [dir, calculateByName(dir)])
  );

  const spaceToFree = 30000000 - (70000000 - sizeMap["/"]);

  const sortedCandidates = Object.entries(sizeMap)
    .filter(([dir, size]) => size >= spaceToFree)
    .sort(([dirA, sizeA], [dirB, sizeB]) => sizeA - sizeB);

  const [smallestDir] = sortedCandidates;
  console.log(smallestDir[1]);
}

main();
