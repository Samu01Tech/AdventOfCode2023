interface Directions {
  left: string;
  right: string;
}
const data = await Bun.file("input.txt").text();
const lines = data.split("\n");
const instructions = lines[0].split("");
const networkData = lines.splice(2);
const networkMap = new Map<string, Directions>();
networkData.forEach((line) => {
  // remove all symbols in the line
  const parsed = line.replace(/[^a-zA-Z0-9]/g, " ");
  const [start, _, left, right] = parsed.split("  ");
  if (left === undefined || right === undefined) {
    throw new Error("Something went wrong");
  }
  networkMap.set(start, {
    left: left.trim(),
    right: right.trim(),
  });
});

let ZZZfound = false;
let steps = 0;
let currentLabel = "AAA";
while (!ZZZfound) {
  const currentDirection = instructions.shift() ?? "L";
  const currentPosition = networkMap.get(currentLabel);
  if (currentDirection === "L") {
    currentLabel = currentPosition?.left ?? currentLabel;
  } else {
    currentLabel = currentPosition?.right ?? currentLabel;
  }
  steps++;
  instructions.push(currentDirection);
  if (currentLabel === "ZZZ") {
    ZZZfound = true;
  }
}

console.log("Part 1 steps:", steps);
