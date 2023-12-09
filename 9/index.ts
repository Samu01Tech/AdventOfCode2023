const data = await Bun.file("input.txt").text();
const histories = data
  .split("\n")
  .map((line) => line.split(" ").map((x) => parseInt(x, 10)));

const finalNumbers: number[] = [];
const initialNumbers: number[] = [];
histories.forEach((history) => {
  const pyramid = [];
  pyramid.unshift(history.reverse());
  while (pyramid[0].some((x) => x !== 0)) {
    const row = [];
    for (let i = 0; i < pyramid[0].length - 1; i++) {
      const a: number = pyramid[0][i];
      const b: number = pyramid[0][i + 1];
      const res = a - b;
      row.push(res);
    }
    pyramid.unshift(row);
  }
  pyramid[0].unshift(0);
  for (let i = 0; i < pyramid.length - 1; i++) {
    const a = pyramid[i][0];
    const b = pyramid[i + 1][0];

    const c = pyramid[i][pyramid[i].length - 1];
    const d = pyramid[i + 1][pyramid[i + 1].length - 1];
    pyramid[i + 1].unshift(a + b);
    pyramid[i + 1].push(d - c);
  }
  finalNumbers.push(pyramid[pyramid.length - 1][0]);
  initialNumbers.push(history[history.length - 1]);
});

console.log(
  "Part 1:",
  finalNumbers.reduce((a, b) => a + b, 0)
);
console.log(
  "Part 2:",
  initialNumbers.reduce((a, b) => a + b, 0)
);
