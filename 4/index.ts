const data = await Bun.file("input.txt").text();
const lines = data.split("\n");
const cards = lines.map((line) =>
  line
    .split(":")[1]
    .trim()
    .split("|")
    .map((card) =>
      card
        .trim()
        .split(" ")
        .filter((x) => x !== "")
        .map((x) => parseInt(x))
    )
);

let total = 0;
const cardsWinsMap = new Map<
  number,
  {
    cardCount: number;
    wins: number;
  }
>();

for (let i = 0; i < cards.length; i++) {
  const [winningNumbers, myNumbers] = cards[i];
  let points = 0;
  let numbersFound = 0;
  for (const number of myNumbers) {
    if (winningNumbers.includes(number)) {
      console.log("Found", number);
      numbersFound++;
    }
  }
  if (numbersFound !== 0) {
    points += 2 ** (numbersFound - 1);
  }
  total += points;
  console.log("---Points", points, "Total", total, "---");

  cardsWinsMap.set(i + 1, {
    cardCount: 1,
    wins: numbersFound,
  });
}

console.log(total);

// Part 2
cardsWinsMap.forEach((n, key) => {
  for (let i = 0; i < n.cardCount; i++) {
    for (let j = key + 1; j <= key + n.wins; j++) {
      cardsWinsMap.set(j, {
        // @ts-ignore
        cardCount: cardsWinsMap.get(j)?.cardCount + 1,
        // @ts-ignore
        wins: cardsWinsMap.get(j).wins,
      });
    }
  }
});

const totalCards = Array.from(cardsWinsMap.values()).reduce(
  (a, b) => a + b.cardCount,
  0
);

console.log(totalCards);
