// Product screenshot cards for /products, mirroring the original list's
// data-driven `.project-card` markup (inline aspect-ratio + lazy loading).
export type ProductShot = {
  src: string;
  alt: string;
  /** Rendered as `aspect-ratio: 1100/<h>` exactly like the original inline style. */
  h: number;
};

// Heights measured from the actual capture files (hero shots are 1456x1043 -> 1100/788).
export const PRODUCT_SHOTS: ProductShot[] = [
  { src: "/images/slides/smartgram.png", alt: "SMARTGRAM", h: 788 },
  { src: "/playground/smartgram-square.png", alt: "SMARTGRAM", h: 1100 },
  { src: "/images/slides/anima-js.png", alt: "anima.js", h: 788 },
  { src: "/playground/anima-js-square.png", alt: "anima.js", h: 1100 },
  { src: "/images/slides/minoru-ai.png", alt: "Minoru-AI", h: 788 },
  { src: "/playground/minoru-ai-square.png", alt: "Minoru-AI", h: 1100 },
  { src: "/images/slides/socialgoodworld.png", alt: "SocialGoodWorld", h: 788 },
  { src: "/playground/socialgoodworld-square.png", alt: "SocialGoodWorld", h: 1100 },
  { src: "/images/slides/smm-smart.png", alt: "SMM Smart", h: 788 },
  { src: "/playground/smm-smart-square.png", alt: "SMM Smart", h: 1100 },
];
