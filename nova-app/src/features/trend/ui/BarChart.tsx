'use client';
import { useCategoryRank } from '@/features/trend/data/barChartData';
import { createCategoryRankOptions } from '@/features/trend/lib/barOption';
import { useThemeToggle } from '@/shared/hooks';
import { Bar } from 'react-chartjs-2';

export const BarChart = () => {
  const { isDark } = useThemeToggle();
  const categoryRankData = useCategoryRank(isDark);

  return (
    <div className='h-90 text-optional'>
      <Bar data={categoryRankData} options={createCategoryRankOptions(isDark)} />
    </div>
  );
};
