export const validCategories = [
  "top",
  "bottom",
  "shoes",
  "accessory",
  "outerwear",
  "other",
] as const;

export type Category = typeof validCategories[number];

export function isValidCategory(value: any): value is Category {
  return validCategories.includes(value);
}

export const validSizes = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "One Size",
  "Custom",
  "Unknown",
] as const;

export type Size = typeof validSizes[number];

export function isValidSize(value: any): value is Size {
  return validSizes.includes(value);
}
