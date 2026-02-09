'use client';
import { useGetInterestSkillTop } from '@/features/trend/api/trend';
import { chartColors } from '@/features/trend/lib/chartColor';
import { useBarKeywordStore } from '@/features/trend/model/useBarKeywordTop';
import { getCategoryArray } from '@/features/trend/utils/getCategoryArray';
import type { ChartData } from 'chart.js';

export const useCategoryRank = (isDark: boolean) => {
  const { data } = useGetInterestSkillTop();
  const { category } = useBarKeywordStore();
  const colors = isDark ? chartColors.dark : chartColors.light;

  const filteredRankings = data.rankings.filter(
    (item) => getCategoryArray(item.keywords) === category,
  );

  const labels = filteredRankings.flatMap((item) => item.keywords);

  const values = filteredRankings.flatMap((item) =>
    item.keywords.map(() => item.totalMentionCount),
  );
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
  return categoryRankData;
};
