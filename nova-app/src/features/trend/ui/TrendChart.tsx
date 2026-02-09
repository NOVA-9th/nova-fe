'use client';

import { Line } from 'react-chartjs-2';
import '@/features/trend/lib/chart';
import { createTrendOptions } from '@/features/trend/lib/lineOption';
import { TrendLegend, LegendDataset } from '@/features/trend/ui/TrendLegend';
import { useKeywordChart } from '@/features/trend/data/lineChartData';

export const TrendChart = () => {
  const trendChartData = useKeywordChart();
  return (
    <div className='bg-static rounded-2xl min-h-83'>
      {/* 차트 */}
      <div className='overflow-x-auto'>
        <div className='min-w-160 h-77'>
          <Line data={trendChartData} options={createTrendOptions()} />
        </div>
      </div>

      {/* legend */}
      <TrendLegend datasets={trendChartData.datasets as LegendDataset[]} />
    </div>
  );
};
