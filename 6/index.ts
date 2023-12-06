const data = await Bun.file("input.txt").text();
const lines = data.split("\n");
const times = lines[0]
  .split(" ")
  .map((x) => parseInt(x, 10))
  .filter((x) => !isNaN(x));
const distance = lines[1]
  .split(" ")
  .map((x) => parseInt(x, 10))
  .filter((x) => !isNaN(x));

console.log({ times, distance });

let totalWins = 1;
for (let i = 0; i < times.length; i++) {
  let wins = 0;
  for (let j = 0; j < times[i]; j++) {
    const remaining = times[i] - j;
    const distanceTraveled = j * remaining;
    if (distanceTraveled > distance[i]) {
      wins++;
    }
    // console.log({
    //   remaining,
    //   hold,
    //   distanceTraveled,
    //   distance: distance[i],
    //   wins,
    // });
  }
  totalWins *= wins;
}

console.log("Total wins 1:", totalWins);

const times2 = [parseInt(times.join(""))];
const distance2 = [parseInt(distance.join(""))];
console.log({ times2, distance2 });

let totalWins2 = 0;
for (let i = 0; i < times2.length; i++) {
  let wins = 0;
  for (let j = 0; j < times2[i]; j++) {
    const remaining = times2[i] - j;
    const distanceTraveled = j * remaining;
    if (distanceTraveled > distance2[i]) {
      wins++;
    }
    // console.log({
    //   remaining,
    //   hold,
    //   distanceTraveled,
    //   distance: distance[i],
    //   wins,
    // });
  }
  totalWins2 += wins;
}

console.log("Total wins 2:", totalWins2);
