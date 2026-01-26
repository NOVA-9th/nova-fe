'use client';
import { Line } from 'react-chartjs-2';
import { createTrendOptions } from '@/features/trend/lib/tredOption';
import '../lib/chart';
import { TrendLegend } from '@/features/trend/ui/ChaerLegend';
import { trendChartData } from '@/features/trend/mock/cartData';

export const TrendChart = () => {
  return (
    <div className='bg-static rounded-2xl'>
      {/* 차트 */}
      <div className='h-[310px] px-2'>
        <Line data={trendChartData} options={createTrendOptions()} />
      </div>

      {/* legend */}
      <TrendLegend datasets={trendChartData.datasets} />
    </div>
  );
};
