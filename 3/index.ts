type Matrix = Array<Array<string | number>>;

const data = await Bun.file("input.txt").text();
const lines = data.split("\n");
const matrix = lines.map((line) =>
  line.split("").map((char) => {
    if (char === "0") return 0;
    if (parseInt(char)) return parseInt(char);
    return char;
  })
);

const isEqualToSymbol = (input: string | number) => {
  // return true if input is different from number and "."
  if (typeof input === "number") return false;
  if (input === ".") return false;
  return true;
};

const hasSymbolNear = (matrix: Matrix, i: number, j: number): boolean => {
  if (matrix[i][j + 1] !== undefined) {
    const right = matrix[i][j + 1];

    if (isEqualToSymbol(right)) {
      return true;
    }
  }

  if (matrix[i][j - 1] !== undefined) {
    const left = matrix[i][j - 1];

    if (isEqualToSymbol(left)) {
      return true;
    }
  }

  if (matrix[i - 1] !== undefined) {
    const topLeft = matrix[i - 1][j - 1];
    const top = matrix[i - 1][j];
    const topRight = matrix[i - 1][j + 1];

    if (isEqualToSymbol(topLeft)) {
      return true;
    }

    if (isEqualToSymbol(top)) {
      return true;
    }

    if (isEqualToSymbol(topRight)) {
      return true;
    }
  }

  if (matrix[i + 1] !== undefined) {
    const bottomLeft = matrix[i + 1][j - 1];
    const bottom = matrix[i + 1][j];
    const bottomRight = matrix[i + 1][j + 1];

    if (isEqualToSymbol(bottomLeft)) {
      return true;
    }

    if (isEqualToSymbol(bottom)) {
      return true;
    }

    if (isEqualToSymbol(bottomRight)) {
      return true;
    }
  }

  return false;
};

const buildNumber = (matrix: Matrix, i: number, j: number) => {
  let peekPosition = j;
  let number = "";
  while (
    matrix[i][peekPosition] !== "." &&
    !isEqualToSymbol(matrix[i][peekPosition])
  ) {
    const char = matrix[i][peekPosition].toString();
    number += char;
    peekPosition++;
  }
  return number;
};

let numbers = [];
for (let i = 0; i < matrix.length; i++) {
  const line = matrix[i];
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (typeof char === "number") {
      const res = hasSymbolNear(matrix, i, j);
      if (res) {
        // has symbol near
        let number = buildNumber(matrix, i, j);
        numbers.push(number);
        j += number.length;
      } else {
        // no symbol near
        let peekPosition = j + 1;
        let hasSymbolAfter = false;
        while (typeof matrix[i][peekPosition] === "number") {
          if (matrix[i][peekPosition] === ".") break;
          if (hasSymbolNear(matrix, i, peekPosition)) {
            hasSymbolAfter = true;
            let number = buildNumber(matrix, i, j);
            numbers.push(number);
            j += number.length;
            break;
          }
          peekPosition++;
        }
      }
    }
  }
}

console.log(numbers.reduce((acc, curr) => acc + parseInt(curr), 0));
console.log(numbers);

const data2 = await Bun.file("input.txt").text();
const lines2 = data2.split("\n");
const grid = lines2.map((line) => line.split("."));
console.log(grid);
