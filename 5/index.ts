interface Range {
  destinationRangeStart: number;
  sourceRangeStart: number;
  rangeLength: number;
}

interface Map {
  name: string;
  ranges: Range[];
}

interface SeedRange {
  start: number;
  lenght: number;
}

const formatter = new Intl.NumberFormat("it-IT");

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
  .filter((line) => line.length > 0);

let maps: Map[] = [];

for (const step of steps) {
  const map: Map = {
    name: step[0].split(" ")[0],
    ranges: [],
  };
  const stepValue = step[1]
    .trim()
    .split("\n")
    .map((line) => line.split(" "));

  for (const line of stepValue) {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = line;
    const range: Range = {
      destinationRangeStart: parseInt(destinationRangeStart),
      sourceRangeStart: parseInt(sourceRangeStart),
      rangeLength: parseInt(rangeLength),
    };
    map.ranges.push(range);
  }
  maps.push(map);
}

let newSeeds = [];
for (let seed of seeds) {
  for (const map of maps) {
    for (const range of map.ranges) {
      if (
        seed >= range.sourceRangeStart &&
        seed <= range.sourceRangeStart + range.rangeLength
      ) {
        // console.log(
        //   "Seed",
        //   seed,
        //   "Map",
        //   map.name,
        //   "Destination",
        //   range.destinationRangeStart + (seed - range.sourceRangeStart)
        // );
        seed = range.destinationRangeStart + (seed - range.sourceRangeStart);
        break;
      }
    }
  }
  newSeeds.push(seed);
  console.log("---");
}

console.log("Minimum location", formatter.format(Math.min(...newSeeds)));

const seeds2 = [];
for (let i = 0; i < seeds.length; i += 2) {
  console.log(i);
  const seed = seeds[i];
  const length = seeds[i + 1];
  for (let j = 0; j < length; j++) {
    seeds2.push(seed + j);
  }
}

console.time("Part 2");
// let newSeeds2 = [];
console.log("Seeds2 lenght:", seeds2.length);
// let iteration = 0;
// for (let seed of seeds2) {
//   iteration++;
//   if (iteration % 100 === 0) {
//     console.log("Elaborazione:", seed / seeds2.length, "%");
//   }
//   for (const map of maps) {
//     for (const range of map.ranges) {
//       if (
//         seed >= range.sourceRangeStart &&
//         seed <= range.sourceRangeStart + range.rangeLength
//       ) {
//         // console.log(
//         //   "Seed",
//         //   seed,
//         //   "Map",
//         //   map.name,
//         //   "Destination",
//         //   range.destinationRangeStart + (seed - range.sourceRangeStart)
//         // );
//         seed = range.destinationRangeStart + (seed - range.sourceRangeStart);
//         break;
//       }
//     }
//   }
//   newSeeds2.push(seed);
//   // console.log("---");
// }
// console.timeEnd("Part 2");

// console.log("Minimum location", formatter.format(Math.min(...newSeeds2)));
