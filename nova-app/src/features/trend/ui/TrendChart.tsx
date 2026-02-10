'use client';

import { Line } from 'react-chartjs-2';
import '@/features/trend/lib/chart';
import { createTrendOptions } from '@/features/trend/lib/lineOption';
import { TrendLegend, LegendDataset } from '@/features/trend/ui/TrendLegend';
import { useKeywordChart } from '@/features/trend/data/lineChartData';
import { useThemeToggle } from '@/shared/hooks';

export const TrendChart = () => {
  const trendChartData = useKeywordChart();
  const { isDark } = useThemeToggle();
  const isEmpty = trendChartData.datasets.length === 0;
  return (
    <div className='bg-static rounded-2xl min-h-83 relative'>
      {/* 차트 */}
      <div className='overflow-x-auto '>
        <div className='min-w-160 h-77'>
          <Line data={trendChartData} options={createTrendOptions(isDark)} />
        </div>
      </div>

      {/* legend */}
      <TrendLegend datasets={trendChartData.datasets as LegendDataset[]} />

      {isEmpty && (
        <p className='absolute left-1/2 -translate-x-1/6 -translate-y-10 top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-10 md:top-1/2 text-additive body-base break-keep whitespace-normal'>
          인기 키워드를 선택해주세요!
        </p>
      )}
    </div>
  );
};
