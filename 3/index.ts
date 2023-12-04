import { TracingChannel } from "diagnostics_channel";

const data = await Bun.file("input.txt").text();
const lines = data.split("\n");
const matrix = lines.map((line) => line.split(""));

interface Number {
  value: string;
  i: number;
  j: number;
  hasSymbolNear: boolean;
}

const isNumber = (input: string): boolean => {
  return !isNaN(parseInt(input));
};

const isDot = (input: string): boolean => {
  return input === ".";
};

const symbolNear = (matrix: string[][], i: number, j: number): boolean => {
  const sorrounding = [];
  if (matrix[i - 1] !== undefined) {
    sorrounding.push(matrix[i - 1][j]);
    if (matrix[i - 1][j - 1]) sorrounding.push(matrix[i - 1][j - 1]);
    if (matrix[i - 1][j + 1]) sorrounding.push(matrix[i - 1][j + 1]);
  }
  if (matrix[i + 1] !== undefined) {
    sorrounding.push(matrix[i + 1][j]);
    if (matrix[i + 1][j - 1]) sorrounding.push(matrix[i + 1][j - 1]);
    if (matrix[i + 1][j + 1]) sorrounding.push(matrix[i + 1][j + 1]);
  }
  if (matrix[i][j - 1]) {
    sorrounding.push(matrix[i][j - 1]);
  }
  if (matrix[i][j + 1]) {
    sorrounding.push(matrix[i][j + 1]);
  }

  return sorrounding.some((char) => !isNumber(char) && !isDot(char));
};

let numbers = [];
for (let i = 0; i < matrix.length; i++) {
  const line = matrix[i];
  let number: Number = {
    value: "",
    i: 0,
    j: 0,
    hasSymbolNear: false,
  };
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (isNumber(char)) {
      number.value += char;
      number.i = i;
      number.j = j;
      if (!number.hasSymbolNear)
        number.hasSymbolNear = symbolNear(matrix, i, j);
    }
    if (
      j + 1 === line.length ||
      ((isDot(char) || !isNumber(char)) && number.value.length > 0)
    ) {
      if (number.hasSymbolNear) {
        numbers.push(number);
      }
      number = {
        value: "",
        i: 0,
        j: 0,
        hasSymbolNear: false,
      };
    }
  }
}

const partsNumber = numbers.reduce((a, b) => a + parseInt(b.value), 0);
console.log("partsNumber", partsNumber);

const buildNumber = (
  matrix: string[][],
  i: number,
  j: number,
  mode: string
) => {
  let number: string = "";
  let number2: string = "";

  if (mode === "top") {
    let x = j - 1;
    let y = i - 1;
    while (isNumber(matrix[y][x])) {
      x--;
    }
    x++;
    if (!isNumber(matrix[y][x])) x++;
    while (isNumber(matrix[y][x])) {
      number += matrix[y][x];
      matrix[y][x] = ".";
      x++;
    }
    if (matrix[y][x] === "." && matrix[y + 1][x] === "*") x++;
    while (isNumber(matrix[y][x])) {
      number2 += matrix[y][x];
      matrix[y][x] = ".";
      x++;
    }
  } else if (mode === "bottom") {
    let x = j - 1;
    let y = i + 1;
    while (isNumber(matrix[y][x])) {
      x--;
    }
    x++;
    if (!isNumber(matrix[y][x])) x++;
    while (isNumber(matrix[y][x])) {
      number += matrix[y][x];
      matrix[y][x] = ".";
      x++;
    }
    if (matrix[y][x] === "." && matrix[y - 1][x] === "*") x++;
    while (isNumber(matrix[y][x])) {
      number2 += matrix[y][x];
      matrix[y][x] = ".";
      x++;
    }
  } else if (mode === "left") {
    let x = j - 1;
    let y = i;
    while (isNumber(matrix[y][x])) {
      x--;
    }
    x++;
    if (!isNumber(matrix[y][x]) && matrix[y][x] !== "*") x++;
    while (isNumber(matrix[y][x])) {
      number += matrix[y][x];
      matrix[y][x] = ".";
      x++;
    }
  } else if (mode === "right") {
    let x = j + 1;
    let y = i;
    while (isNumber(matrix[y][x])) {
      number += matrix[y][x];
      matrix[y][x] = ".";
      x++;
    }
  }

  return [number, number2];
};

let gearRatiosSum = 0;
let num: number = 0;
for (let i = 1; i < matrix.length - 1; i++) {
  const line = matrix[i];
  for (let j = 1; j < line.length - 1; j++) {
    const char = line[j];
    if (char === "*") {
      const top = buildNumber(matrix, i, j, "top");
      const bottom = buildNumber(matrix, i, j, "bottom");
      const left = buildNumber(matrix, i, j, "left");
      const right = buildNumber(matrix, i, j, "right");
      const numberiBelli = [top, bottom, left, right]
        .flat()
        .map((n) => parseInt(n))
        .filter((n) => !isNaN(n));

      if (numberiBelli.length > 1) {
        matrix[i][j] = ".";
      }
      if (numberiBelli.length === 2) {
        gearRatiosSum += numberiBelli[0] * numberiBelli[1];
        num++;
      }
    }
  }
}

console.log("gearRatiosSum", gearRatiosSum);
