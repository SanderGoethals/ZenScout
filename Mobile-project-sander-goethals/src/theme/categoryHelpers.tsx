import { categoryColors, CategoryKey, Variant } from './categories';


export const getCategoryColor = (
  category: CategoryKey,
  variant: Variant
) => {
  return categoryColors[category][variant];
};