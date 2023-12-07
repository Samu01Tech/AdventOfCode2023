const input = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;

let map = {};
input.match(/([a-zA-Z].*):/gm).map((key) => {
  const [, numbers] = new RegExp(`${key}\\s*(\\d+(?:\\s+\\d+)*)\\n`, "gm").exec(
    input
  );
  map[key.replace(/:|-|map|\s/gm, "")] = numbers
    .split("\n")
    .map((item) => item.split(" ").map(Number));
});

console.log(map);

const initialSeeds = map.seeds[0];
delete map.seeds;
map = Object.values(map);
console.log(map);

const seedRange = [];
for (let i = 0; i < initialSeeds.length - 1; i += 2) {
  seedRange.push({
    start: initialSeeds[i],
    end: initialSeeds[i] + initialSeeds[i + 1],
  });
}
const seedExist = (seed) =>
  seedRange.some(({ start, end }) => seed >= start && seed <= end);

const getSeedByLocation = (location) => {
  let result = location;
  for (const item of [...map].reverse()) {
    for (const [destination, source, range] of item) {
      if (destination <= result && destination + range > result) {
        result = source + result - destination;
        break;
      }
    }
  }

  return result;
};

for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
  const seed = getSeedByLocation(i);

  if (seedExist(seed)) {
    console.log(i);
    break;
  }
}
