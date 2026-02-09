'use client';
import { useGetInterestSkillTop, useGetKeywordTop } from '@/features/trend/api';
import { useBarKeywordStore } from '@/features/trend/model/useBarKeywordTop';
import { getCategoryArray } from '@/features/trend/utils/getCategoryArray';
import type { ChartData } from 'chart.js';

export const useCategoryRank = () => {
  const { data } = useGetInterestSkillTop();
  const { data: keyword } = useGetKeywordTop();
  console.log(keyword);
  console.log(data);
  const { category } = useBarKeywordStore();
  if (!data) return null;

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
        backgroundColor: '#151618',
        borderRadius: 16,
        categoryPercentage: 1,
        barPercentage: 0.8,
        clip: false,
      },
    ],
  };
  return categoryRankData;
};
