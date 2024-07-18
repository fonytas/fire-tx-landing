import { sha256 } from "./crypto";

// export function createColor(input: string): string {
//   const seed = sha256(input)
//   // Generate a hash-like number based on the characters of the seed string
//   let hash = 0;

//   for (let i = 0; i < seed.length; i++) {
//     const charCode = seed.charCodeAt(i);
//     hash = (hash << 5) - hash + charCode;
//     hash |= 0; // Convert to 32-bit integer
//   }

//   // Ensure the color is not too light or too dark
//   const midBrightness = 0x888888; // RGB: 136, 136, 136
//   const randomColor = (hash + midBrightness) & 0xffffff; // Mask to 24-bit color range

//   // Convert the random number to a 6-digit hex color
//   const color = `#${randomColor.toString(16).padStart(6, '0')}`;

//   return color;
// }

export function createColor(input: string): string {
  // Calculate SHA-256 hash of the input string
  const hash = sha256(input);

  // Use the first 8 characters of the hash as the seed
  const hashSeed = hash.substring(0, 8);

  // Convert the hashSeed to a numeric value
  let numericSeed = parseInt(hashSeed, 16);

  // Ensure the color is within a certain brightness range
  const minLightness = 30; // Minimum lightness value (0-100)
  const maxLightness = 70; // Maximum lightness value (0-100)

  // Generate a random lightness within the specified range
  const lightness = Math.floor(Math.random() * (maxLightness - minLightness + 1)) + minLightness;

  // Adjust the hue to get a different color
  const hue = numericSeed % 360; // Use modulo to keep it within 0-359 range

  // Generate an HSL color
  const saturation = 50; // Saturation (0-100), lower value for less saturation

  // Convert HSL to RGB
  const rgbColor = hslToRgb(hue, saturation, lightness);

  // Convert RGB to hex color
  const hexColor = rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b);

  return hexColor;
}

// Helper function: Convert HSL to RGB
function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  // Convert HSL to RGB (adapted from https://stackoverflow.com/a/9493060)
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
  } else if (120 <= h && h < 180) {
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}

// Helper function: Convert RGB to hex color
function rgbToHex(r: number, g: number, b: number): string {
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

export const predefinedColors: string[] = [
  '#ffd700',   // Gold
  '#6a5acd',   // Slate Blue
  '#87ceeb',   // Sky Blue
  '#f08080',   // Light Coral
  '#90ee90',   // Light Green
  '#ba55d3',   // Medium Orchid
  '#db7093',   // Pale Violet Red
  '#add8e6',   // Light Blue
  '#98ff98',   // Mint
  '#ffff00',   // Yellow
  '#9acd32',   // Yellow Green
  '#e6e6fa',   // Light Purple
  '#dc143c',   // Crimson
  '#ffbf00',   // Orange Amber
  '#e6e6fa',   // Lavender
  '#7fffd4',   // Aquamarine
  '#ff1493',   // Deep Pink
  '#00ff7f',   // Spring Green
  '#fa8072',   // Salmon
  '#d8bfd8',   // Thistle
];