'use client';

import { Line } from 'react-chartjs-2';
import '@/features/trend/lib/chart';
import { trendChartData } from '@/features/trend/mock/lineChartData';
import { createTrendOptions } from '@/features/trend/lib/lineOption';
import { TrendLegend, LegendDataset } from '@/features/trend/ui/TrendLegend';

export const TrendChart = () => {
  return (
    <div className='bg-static rounded-2xl'>
      {/* 차트 */}
      <div className='h-77.5 px-2'>
        <Line data={trendChartData} options={createTrendOptions()} />
      </div>

      {/* legend */}
      <TrendLegend datasets={trendChartData.datasets as LegendDataset[]} />
    </div>
  );
};
