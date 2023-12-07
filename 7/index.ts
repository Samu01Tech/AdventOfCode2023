interface Hand {
  hand: string;
  bid: string;
  strength: Strength;
  rank: number;
}

export const enum Strength {
  HighCard,
  OnePair,
  TwoPair,
  ThreeOfAKind,
  FullHouse,
  FourOfAKind,
  FiveOfAKind,
  NotAssigned,
}
const cardsValue = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

const cardsValue2 = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
];

const data = await Bun.file("input.txt").text();
const hands: Hand[] = data.split("\n").map((game) => {
  const [hand, bid] = game.split(" ");
  return { hand, bid, strength: Strength.NotAssigned, rank: 0 };
});

console.log(hands);

export function getStrengthOfHand(hand: string): Strength {
  const cards = hand.split("");
  const mapOfCards = new Map<string, number>();
  cards.forEach((card) =>
    mapOfCards.set(card, (mapOfCards.get(card) || 0) + 1)
  );
  const values = Array.from(mapOfCards.values());
  if (mapOfCards.size === 1) {
    return Strength.FiveOfAKind;
  }
  if (mapOfCards.size === 4) {
    return Strength.OnePair;
  }
  if (mapOfCards.size === 3) {
    if (values.includes(3)) {
      return Strength.ThreeOfAKind;
    }
    return Strength.TwoPair;
  }
  if (mapOfCards.size === 2) {
    if (values.includes(3)) {
      return Strength.FullHouse;
    }
    return Strength.FourOfAKind;
  }
  return Strength.HighCard;
}

// 249275219
export function getStrengthOfHand2(hand: string): Strength {
  const cards = hand.split("");
  const mapOfCards = new Map<string, number>();
  cards.forEach((card) =>
    mapOfCards.set(card, (mapOfCards.get(card) || 0) + 1)
  );
  //   if cards include J
  if (cards.includes("J")) {
    if (mapOfCards.size === 1) {
      // case JJJJJ
      return Strength.FiveOfAKind;
    }
    const mapsOfCardsSorted = new Map(
      [...mapOfCards.entries()]
        .sort((a, b) => cardsValue2.indexOf(a[0]) - cardsValue2.indexOf(b[0]))
        .sort((a, b) => b[1] - a[1])
        .filter((a) => a[0] !== "J")
    );
    const valueOfJ = mapOfCards.get("J") ?? 0;
    const highestKey = mapsOfCardsSorted.keys().next().value ?? "";
    const highestValue = mapsOfCardsSorted.get(highestKey) ?? 0;
    // sum it to the entry on map of cards with the highest value
    mapOfCards.set(highestKey, highestValue + valueOfJ);
    mapOfCards.delete("J");
  }
  const values = Array.from(mapOfCards.values());
  if (mapOfCards.size === 1) {
    return Strength.FiveOfAKind;
  }
  if (mapOfCards.size === 4) {
    return Strength.OnePair;
  }
  if (mapOfCards.size === 3) {
    if (values.includes(3)) {
      return Strength.ThreeOfAKind;
    }
    return Strength.TwoPair;
  }
  if (mapOfCards.size === 2) {
    if (values.includes(3)) {
      return Strength.FullHouse;
    }
    return Strength.FourOfAKind;
  }
  return Strength.HighCard;
}

export function sortCards(a: Hand, b: Hand) {
  if (a.strength < b.strength) return -1;
  if (a.strength > b.strength) return 1;
  const cardsA = a.hand.split("");
  const cardsB = b.hand.split("");
  for (let i = 0; i < cardsA.length; i++) {
    const cardA = cardsValue.indexOf(cardsA[i]);
    const cardB = cardsValue.indexOf(cardsB[i]);
    if (cardA < cardB) return 1;
    if (cardA > cardB) return -1;
  }
  return 0;
}

export function calculateWinnings(acc: number, game: Hand) {
  const bid = parseInt(game.bid);
  const rank = game.rank;
  return (acc += bid * rank);
}

const strengthedHands = hands.map((game) => ({
  ...game,
  strength: getStrengthOfHand(game.hand),
}));
const sortedHands = strengthedHands.sort(sortCards);
const rankedHands = sortedHands.map((game, i) => ({ ...game, rank: i + 1 }));
const totalWinnings = rankedHands.reduce(calculateWinnings, 0);

const strengthedHands2 = hands.map((game) => ({
  ...game,
  strength: getStrengthOfHand2(game.hand),
}));
const sortedHands2 = strengthedHands2.sort(sortCards);
const rankedHands2 = sortedHands2.map((game, i) => ({ ...game, rank: i + 1 }));
const totalWinnings2 = rankedHands2.reduce(calculateWinnings, 0);

console.log({
  totalWinnings,
  totalWinnings2,
});
