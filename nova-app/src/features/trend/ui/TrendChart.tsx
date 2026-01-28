'use client';

import { Line } from 'react-chartjs-2';
import '../lib/chart';
import { trendChartData } from '@/features/trend/mock/lineChartData';
import createTrendOptions from '@/features/trend/lib/lineOption';
import TrendLegend, { LegendDataset } from '@/features/trend/ui/TrendLegend';
const TrendChart = () => {
  return (
    <div className='bg-static rounded-2xl'>
      {/* 차트 */}
      <div className='h-[310px] px-2'>
        <Line data={trendChartData} options={createTrendOptions()} />
      </div>

      {/* legend */}
      <TrendLegend datasets={trendChartData.datasets as LegendDataset[]} />
    </div>
  );
};

export default TrendChart;
