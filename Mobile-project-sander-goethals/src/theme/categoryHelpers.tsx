import { categoryColors, CategoryKey } from './categories';

type Variant = 'even' | 'odd' | 'loader';

export const getCategoryColor = (
  category: CategoryKey,
  variant: Variant
) => {
  return categoryColors[category][variant];
};