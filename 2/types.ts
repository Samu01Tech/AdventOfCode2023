export interface Game {
  id: number;
  extractions: Extraction[];
}

export interface Extraction {
  r: number;
  g: number;
  b: number;
}
