import { getCategory } from './getCategory';

export const getCategoryArray = (keywords: string[]): string => {
  for (const keyword of keywords) {
    const category = getCategory(keyword);
    if (category !== '') {
      return category;
    }
  }
  return '';
};
