import { KEYWORD_CATEGORY_MAP } from '@/features/trend/constants/keywordCategoryMap';

export const getCategory = (keyword: string): string => {
  for (const [category, keywords] of Object.entries(KEYWORD_CATEGORY_MAP)) {
    if (keywords.includes(keyword)) {
      return category;
    }
  }
  return '';
};
