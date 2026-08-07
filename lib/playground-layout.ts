// Masonry layout data ported verbatim from the original playground engine:
// 6 columns, per-card aspect ratios (h/w) and natural rotations. Cards use
// object-fit:cover, so our own screenshots drop into the exact same layout.
const columns: string[][] = [
  ["29", "30", "31", "32", "33"],
  ["1", "2", "3", "4", "5"],
  ["6", "7", "8", "9", "10", "11"],
  ["12", "13", "14", "15", "16", "17"],
  ["18", "19", "20", "21", "22", "23"],
  ["24", "25", "26", "27", "28"],
];

const aspect: Record<string, number> = {
  "29": 479 / 409, "30": 348 / 412, "31": 270 / 409, "32": 461 / 408, "33": 399 / 407,
  "1": 389 / 413, "2": 455 / 408, "3": 440 / 415, "4": 440 / 415, "5": 333 / 411,
  "6": 270 / 409, "7": 425 / 415, "8": 393 / 414, "9": 386 / 407, "10": 494 / 417, "11": 275 / 409,
  "12": 288 / 410, "13": 329 / 406, "14": 336 / 411, "15": 448 / 415, "16": 460 / 416, "17": 327 / 406,
  "18": 506 / 409, "19": 425 / 415, "20": 310 / 418, "21": 324 / 406, "22": 397 / 414, "23": 512 / 409,
  "24": 467 / 416, "25": 410 / 407, "26": 360 / 412, "27": 412 / 414, "28": 379 / 407,
};

const rot: Record<string, number> = {
  "29": 1, "30": -2, "31": 2, "32": -1, "33": 1,
  "1": -2, "2": 1, "3": -2, "4": 2, "5": -2,
  "6": 2, "7": -2, "8": 2, "9": 1, "10": -2, "11": 2,
  "12": -2, "13": 1, "14": -2, "15": 2, "16": -2, "17": 1,
  "18": 1, "19": -2, "20": -3.68, "21": 1, "22": -2, "23": 1,
  "24": -2, "25": 1, "26": -2, "27": 2, "28": 1,
};

// 15 unique captures of the 5 product sites, cycled across the 33 slots.
const SHOTS = [
  "/playground/smartgram-square.png",
  "/playground/anima-js-mobile.png",
  "/playground/minoru-ai-square.png",
  "/playground/socialgoodworld-mobile.png",
  "/playground/smm-smart-square.png",
  "/playground/smartgram-mobile.png",
  "/playground/anima-js-square.png",
  "/playground/minoru-ai-mobile.png",
  "/playground/socialgoodworld-square.png",
  "/playground/smm-smart-mobile.png",
  "/images/slides/smartgram.png",
  "/images/slides/anima-js.png",
  "/images/slides/minoru-ai.png",
  "/images/slides/socialgoodworld.png",
  "/images/slides/smm-smart.png",
];

export const CARD_W = 320;
export const GAP = 26;
const colStagger = [0, 70, 24, 96, 10, 54];

export type PgItem = { src: string; x: number; y: number; w: number; h: number; r: number };

export const PG_ITEMS: PgItem[] = [];
let maxColBottom = 0;
columns.forEach((colIds, colIndex) => {
  const x = colIndex * (CARD_W + GAP) + GAP;
  let y = colStagger[colIndex];
  colIds.forEach((id) => {
    const h = Math.round(CARD_W * aspect[id]);
    PG_ITEMS.push({ src: SHOTS[(parseInt(id, 10) - 1) % SHOTS.length], x, y, w: CARD_W, h, r: rot[id] });
    y += h + GAP;
  });
  if (y > maxColBottom) maxColBottom = y;
});

export const CANVAS_W = columns.length * (CARD_W + GAP) + GAP;
export const CANVAS_H = maxColBottom + GAP;
export const BASE_SCALE = 1.7;
export const MIN_SCALE = 0.15;
export const MAX_SCALE = 4.5;
