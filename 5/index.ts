var Parallel = require("paralleljs");

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
}

// console.log("Minimum location", formatter.format(Math.min(...newSeeds)));

function getMinFromSeed({
  seed,
  lenght,
  i,
}: {
  seed: number;
  lenght: number;
  i: number;
}) {
  let minNumber: number = Number.MAX_SAFE_INTEGER;
  console.log((i / seeds.length) * 100, "%");
  for (let newSeedOffset = 0; newSeedOffset < lenght; newSeedOffset++) {
    let currentInitialSeed = seed + newSeedOffset;
    let currentSeed = currentInitialSeed;
    let tmpSeed = 0;
    for (const map of maps) {
      for (const range of map.ranges) {
        if (
          currentSeed >= range.sourceRangeStart &&
          currentSeed <= range.sourceRangeStart + range.rangeLength
        ) {
          tmpSeed =
            range.destinationRangeStart +
            (currentSeed - range.sourceRangeStart);
          // console.log(
          //   "[",
          //   seed,
          //   "]",
          //   map.name,
          //   "|",
          //   currentSeed,
          //   "->",
          //   tmpSeed
          // );
          break;
        }
      }
      currentSeed = tmpSeed;
    }
    if (tmpSeed < minNumber) {
      minNumber = tmpSeed;
    }

    tmpSeed = 0;
    // console.log("^", seed, "+", newSeedOffset, "=", currentInitialSeed);
    // console.log("---");
  }
}

console.time("Part 2");
const minimums = [];
var parallel = new Parallel();
for (let i = 0; i < seeds.length; i += 2) {
  minimums.push(
    parallel
      .spawn(
        ({ seed, lenght, i }: { seed: number; lenght: number; i: number }) => {
          return getMinFromSeed({ seed, lenght, i });
        }
      )
      .then(() => {
        console.log("Done", i);
      })
  );
}

const results = await Promise.all(minimums);
let minNumber = Number.MAX_SAFE_INTEGER;
for (const result of results) {
  if (result < minNumber) {
    minNumber = result;
  }
}
console.log("Minimum location", minNumber);
console.timeEnd("Part 2");

// console.log("Minimum location", formatter.format(Math.min(...newSeeds2)));
