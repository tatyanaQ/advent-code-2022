const { readFile } = require("../utils");

const exampleFileName = "input_example";
const testFileName = "input";

const fileName = testFileName;

class Monkey {
  constructor(description) {
    this.inspectAmount = 0;
    this.parse(description);
  }

  parse(description) {
    const [indexRow, itemsRow, opRow, testRow, testTrueRow, testFalseRow] =
      description.split("\n");

    this.index = this.getIndex(indexRow);
    this.items = this.getItems(itemsRow);
    this.operation = this.getOperation(opRow);
    this.testOperand = this.getTest(testRow);
    this.testTrue = this.getThrow(testTrueRow, "true");
    this.testFalse = this.getThrow(testFalseRow, "false");
  }

  getIndex(row) {
    const template = /^Monkey (\d+):$/;
    return row.match(template)[1];
  }

  getItems(row) {
    const stringItems = row.replace("  Starting items: ", "");
    return stringItems.split(", ").map(Number);
  }

  sum(a, b) {
    return a + b;
  }

  multiply(a, b) {
    return a * b;
  }

  getOperation(row) {
    const operationItems = row.replace("  Operation: new = old ", "");

    const [operator, operand] = operationItems.split(" ");

    return {
      operator: operator === "+" ? "sum" : "multiply",
      operand: operand === "old" ? "worry" : +operand,
    };
  }

  getTest(row) {
    const testItem = row.replace("  Test: divisible by ", "");

    return Number(testItem);
  }

  getThrow(row, result) {
    const throwItem = row.replace(`    If ${result}: throw to monkey `, "");

    return throwItem;
  }

  worry(item) {
    const { operator, operand } = this.operation;
    return this[operator](item, operand === "worry" ? item : operand);
  }

  relief(item) {
    return Math.floor(item / 3);
  }

  test(item) {
    this.inspectAmount++;

    const result = item % this.testOperand === 0;

    if (result) {
      return this.testTrue;
    }

    return this.testFalse;
  }

  processItem(item) {
    const itemWorried = this.worry(item);
    const itemRelieved = this.relief(itemWorried);

    const throwTo = this.test(itemRelieved);

    return {
      item: itemRelieved,
      throwTo,
    };
  }

  turn() {
    return this.items.map((item) => this.processItem(item));
  }
}

function main() {
  const descriptions = readFile(fileName, "\n\n");

  const monkeys = descriptions.reduce((acc, monkeyDescription) => {
    const monkey = new Monkey(monkeyDescription);

    return {
      ...acc,
      [monkey.index]: monkey,
    };
  }, {});

  for (let i = 1; i <= 20; i++) {
    Object.values(monkeys).forEach((monkey) => {
      const items = monkey.turn();

      items.forEach(({ item, throwTo }) => {
        monkeys[throwTo].items.push(item);
      });

      monkey.items = [];
    });
  }

  const inspectedAmounts = Object.values(monkeys)
    .map((monkey) => monkey.inspectAmount)
    .sort((a, b) => b - a);

  const monkeyBusiness = inspectedAmounts[0] * inspectedAmounts[1];

  console.log(monkeyBusiness);
}

main();
