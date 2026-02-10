'use client';
import { useCategoryRank } from '@/features/trend/data/barChartData';
import { createCategoryRankOptions } from '@/features/trend/lib/barOption';
import { useBarKeywordStore } from '@/features/trend/model/useBarKeywordTop';
import { useThemeToggle } from '@/shared/hooks';
import { Bar } from 'react-chartjs-2';

export const BarChart = () => {
  const { isDark } = useThemeToggle();
  const { categoryRankData, hasData } = useCategoryRank(isDark);
  const { category } = useBarKeywordStore();

  return (
    <>
      <div className='h-90 text-optional relative'>
        <Bar data={categoryRankData} options={createCategoryRankOptions(isDark, hasData)} />
        {category ?? (
          <div className='absolute left-1/2 -translate-x-1/2 top-1/2 text-additive body-base '>
            카테고리를 선택해주세요!
          </div>
        )}
      </div>
    </>
  );
};
