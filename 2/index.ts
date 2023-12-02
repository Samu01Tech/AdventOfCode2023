import { showGraph } from "./showGraph";
import { Extraction, Game } from "./types";

const RED_LIMIT = 12;
const GREEN_LIMIT = 13;
const BLUE_LIMIT = 14;

/**
 * Parses the extraction string and returns an array of Extraction objects.
 * @param extraction - The extraction string to be parsed.
 * @returns An array of Extraction objects.
 */
const parseExtraction = (extraction: string): Extraction[] => {
  const splitExtractions = extraction.split(";");
  const splitExtraction = splitExtractions.map((x) => x.split(","));
  const splitSingle = splitExtraction.map((x) =>
    x.map((y) => y.trim().split(" "))
  );

  const parsedExtraction = [];
  for (const extraction of splitSingle) {
    let entry = { r: 0, g: 0, b: 0 };
    for (const [number, color] of extraction) {
      if (color === "red") {
        entry.r += parseInt(number);
      }
      if (color === "green") {
        entry.g += parseInt(number);
      }
      if (color === "blue") {
        entry.b += parseInt(number);
      }
    }
    parsedExtraction.push(entry);
  }

  return parsedExtraction;
};

const data = await Bun.file("input.txt").text();
const lines = data.split("\n");
const entries = lines.map((line) => line.split(": "));
const games: Game[] = entries.map(([id, extraction]) => {
  const newId = parseInt(id.split(" ")[1]);
  const newExtractions: Extraction[] = parseExtraction(extraction);
  return {
    id: newId,
    extractions: newExtractions,
  };
});

let idSum: number = 0;
let mulSum: number = 0;
for (const game of games) {
  const { id, extractions } = game;
  let possible = false;
  let minimumColors = {
    r: 0,
    g: 0,
    b: 0,
  };
  // First Star
  for (const extraction of extractions) {
    const { r, g, b } = extraction;
    if (r > RED_LIMIT || g > GREEN_LIMIT || b > BLUE_LIMIT) {
      possible = false;
      break;
    } else {
      possible = true;
    }
  }
  if (possible) {
    idSum += id;
  }

  // Second Star
  for (const extraction of extractions) {
    const { r, g, b } = extraction;
    if (r > minimumColors.r) {
      minimumColors.r = r;
    }
    if (g > minimumColors.g) {
      minimumColors.g = g;
    }
    if (b > minimumColors.b) {
      minimumColors.b = b;
    }
  }
  mulSum += minimumColors.r * minimumColors.g * minimumColors.b;
}

console.log("First Star:", idSum);
console.log("Second Star:", mulSum);

// write a chart.js config to show the games variable in a chart
showGraph(games);
