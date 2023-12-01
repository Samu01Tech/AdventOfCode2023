/**
 * Builds a number using the given digits.
 * If the digits array is empty, returns 0.
 * If the digits array has only one element, returns a number formed by repeating that element twice.
 * Otherwise, returns a number formed by concatenating the first and last digits of the array.
 * @param digits - An array of digits.
 * @returns The built number.
 */
const buildNumber = (digits: number[]): number => {
  if (digits.length === 0) {
    return 0;
  }
  if (digits.length === 1) {
    return parseInt(digits[0].toString() + digits[0].toString(), 10);
  } else {
    return parseInt(
      digits[0].toString() + digits[digits.length - 1].toString(),
      10
    );
  }
};

/**
 * Converts a string containing words representing numbers to a string containing the corresponding numeric digits.
 *
 * @param line - The input string to convert.
 * @returns The converted string with numeric digits.
 */
const convertStringsToNumbers = (line: string): string => {
  console.log(line);
  let newLine = "";
  for (let j = 0; j < line.length; j++) {
    if (line[j] === "o" && line[j + 1] === "n" && line[j + 2] === "e") {
      newLine += "1";
    }
    if (line[j] === "t" && line[j + 1] === "w" && line[j + 2] === "o") {
      newLine += "2";
    }
    if (
      line[j] === "t" &&
      line[j + 1] === "h" &&
      line[j + 2] === "r" &&
      line[j + 3] === "e" &&
      line[j + 4] === "e"
    ) {
      newLine += "3";
    }
    if (
      line[j] === "f" &&
      line[j + 1] === "o" &&
      line[j + 2] === "u" &&
      line[j + 3] === "r"
    ) {
      newLine += "4";
    }
    if (
      line[j] === "f" &&
      line[j + 1] === "i" &&
      line[j + 2] === "v" &&
      line[j + 3] === "e"
    ) {
      newLine += "5";
    }
    if (line[j] === "s" && line[j + 1] === "i" && line[j + 2] === "x") {
      newLine += "6";
    }
    if (
      line[j] === "s" &&
      line[j + 1] === "e" &&
      line[j + 2] === "v" &&
      line[j + 3] === "e" &&
      line[j + 4] === "n"
    ) {
      newLine += "7";
    }
    if (
      line[j] === "e" &&
      line[j + 1] === "i" &&
      line[j + 2] === "g" &&
      line[j + 3] === "h" &&
      line[j + 4] === "t"
    ) {
      newLine += "8";
    }
    if (
      line[j] === "n" &&
      line[j + 1] === "i" &&
      line[j + 2] === "n" &&
      line[j + 3] === "e"
    ) {
      newLine += "9";
    }
    if (
      line[j] === "z" &&
      line[j + 1] === "e" &&
      line[j + 2] === "r" &&
      line[j + 3] === "o"
    ) {
      newLine += "0";
    }
    if (isFinite(parseInt(line[j], 10))) {
      newLine += line[j];
    }
  }
  return newLine;
};

// get the input data
const data = await Bun.file("input.txt").text();
const lines = data.split("\n");

// parse the input data
const convertedLines = lines.map((line) => convertStringsToNumbers(line));
const numbers = convertedLines.map((line) =>
  Array.from(line).map((c) => parseInt(c, 10))
);
const filteredNumbers = numbers.map((line) => line.filter((n) => !isNaN(n)));

// build the result
const result = filteredNumbers
  .map((line) => buildNumber(line))
  .reduce((a, b) => a + b);

console.log(result);
