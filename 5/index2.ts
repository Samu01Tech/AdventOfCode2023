interface SeedRange {
  start: number;
  end: number;
}

const data = await Bun.file("input.txt").text();
const lines = data.split("\n\n");
const seeds = lines[0]
  .split(":")[1]
  .trim()
  .split(" ")
  .map((seed) => parseInt(seed));
const steps = lines
  .slice(1)
  .map((line) => line.split(":"))
  .filter((line) => line.length > 0)
  .map((x) => x[1].trim().split("\n"))
  .map((x) => x.map((y) => y.split(" ").map(Number)));

let seedRange: SeedRange[] = [];
for (let i = 0; i < seeds.length; i += 2) {
  seedRange.push({ start: seeds[i], end: seeds[i] + seeds[i + 1] });
}

const seedExist = (seed: number) =>
  seedRange.some(({ start, end }) => seed >= start && seed <= end);

const getSeedByLocation = (location: number) => {
  let result = location;
  for (const item of [...steps].reverse()) {
    for (const [destination, source, range] of item) {
      if (destination <= result && destination + range > result) {
        result = source + (result - destination);
        break;
      }
    }
  }
  return result;
};

console.time("Part 2");
console.log("Start");
for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
  const seed = getSeedByLocation(i);
  if (seedExist(seed)) {
    console.log(i);
    break;
  }
}
console.timeEnd("Part 2");
