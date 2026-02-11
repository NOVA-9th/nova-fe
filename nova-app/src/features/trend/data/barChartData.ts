'use client';
import { useGetInterestSkillTop } from '@/features/trend/hooks/useGetInterestSkillTop';
import { chartColors } from '@/features/trend/lib/chartColor';
import { useBarKeywordStore } from '@/features/trend/model/useBarKeywordTop';
import { getCategoryArray } from '@/features/trend/utils/getCategoryArray';
import type { ChartData } from 'chart.js';

export const useCategoryRank = (isDark: boolean) => {
  const { data } = useGetInterestSkillTop();
  const { category } = useBarKeywordStore();
  const colors = isDark ? chartColors.dark : chartColors.light;

  const selectedCategory = data.rankings.find((item) => {
    const keywordName = item.keywords.map((keyword) => keyword.name);
    return getCategoryArray(keywordName) === category;
  });

  const labels = selectedCategory?.keywords.map((item) => item.name).slice(0, 6);
  const values = selectedCategory?.keywords.map((item) => item.mentionCount).slice(0, 6) ?? [];

  const hasData = values.length > 0;

  const categoryRankData: ChartData<'bar', number[], string> = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors.bgPeak,
        borderRadius: 16,
        categoryPercentage: 1,
        barPercentage: 0.8,
        clip: false,
      },
    ],
  };
  return { categoryRankData, hasData };
};
