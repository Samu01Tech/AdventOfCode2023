import { describe, expect, test } from "bun:test";
import {
  Strength,
  calculateWinnings,
  getStrengthOfHand,
  getStrengthOfHand2,
  sortCards,
} from ".";

describe("hands", () => {
  test("five of a kind", () => {
    expect(getStrengthOfHand("AAAAA")).toBe(Strength.FiveOfAKind);
  });
  test("four of a kind", () => {
    expect(getStrengthOfHand("AA8AA")).toBe(Strength.FourOfAKind);
  });
  test("full house", () => {
    expect(getStrengthOfHand("23332")).toBe(Strength.FullHouse);
  });
  test("three of a kind", () => {
    expect(getStrengthOfHand("TTT98")).toBe(Strength.ThreeOfAKind);
  });
  test("two pair", () => {
    expect(getStrengthOfHand("23432")).toBe(Strength.TwoPair);
  });
  test("one pair", () => {
    expect(getStrengthOfHand("A23A4")).toBe(Strength.OnePair);
  });
  test("high card", () => {
    expect(getStrengthOfHand("23456")).toBe(Strength.HighCard);
  });
});

describe("game", () => {
  const hands = [
    {
      hand: "33332",
      bid: "100",
      strength: 5,
      rank: 0,
    },
    {
      hand: "2AAAA",
      bid: "158",
      strength: 5,
      rank: 0,
    },
    {
      hand: "77888",
      bid: "158",
      strength: 4,
      rank: 0,
    },
    {
      hand: "77788",
      bid: "158",
      strength: 4,
      rank: 0,
    },
  ];

  test("sort cards", () => {
    hands.sort(sortCards);

    expect(hands).toEqual([
      {
        hand: "77788",
        bid: "158",
        strength: 4,
        rank: 0,
      },
      {
        hand: "77888",
        bid: "158",
        strength: 4,
        rank: 0,
      },
      {
        hand: "2AAAA",
        bid: "158",
        strength: 5,
        rank: 0,
      },
      {
        hand: "33332",
        bid: "100",
        strength: 5,
        rank: 0,
      },
    ]);
  });

  test("calculate winnings", () => {
    const ranked = hands.map((game, i) => ({ ...game, rank: i + 1 }));
    const totalWinnings = ranked.reduce(calculateWinnings, 0);

    expect(totalWinnings).toBe(158 * 1 + 158 * 2 + 100 * 4 + 158 * 3);
  });
});

describe("part 2", () => {
  const hands = [
    {
      hand: "32T3K",
      bid: "765",
      strength: 7,
      rank: 0,
    },
    {
      hand: "T55J5",
      bid: "684",
      strength: 7,
      rank: 0,
    },
    {
      hand: "KK677",
      bid: "28",
      strength: 7,
      rank: 0,
    },
    {
      hand: "KTJJT",
      bid: "220",
      strength: 7,
      rank: 0,
    },
    {
      hand: "QQQJA",
      bid: "483",
      strength: 7,
      rank: 0,
    },
  ];

  test("strength", () => {
    expect(getStrengthOfHand2("32T3K")).toBe(Strength.OnePair);
    expect(getStrengthOfHand2("KK677")).toBe(Strength.TwoPair);
    expect(getStrengthOfHand2("T55J5")).toBe(Strength.FourOfAKind);
    expect(getStrengthOfHand2("KTJJT")).toBe(Strength.FourOfAKind);
    expect(getStrengthOfHand2("QQQJA")).toBe(Strength.FourOfAKind);
    expect(getStrengthOfHand2("JJJJJ")).toBe(Strength.FiveOfAKind);
  });
});
