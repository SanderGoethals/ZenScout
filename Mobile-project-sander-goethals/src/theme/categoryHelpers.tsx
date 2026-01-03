import { categoryColors } from "./categories";

export type CategoryKey = keyof typeof categoryColors;

export const getCategoryColor = <
  C extends CategoryKey,
  K extends keyof (typeof categoryColors)[C]
>(
  category: C,
  colorKey: K
): (typeof categoryColors)[C][K] => {
  return categoryColors[category][colorKey];
};
