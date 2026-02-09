'use client';
import { useCategoryRank } from '@/features/trend/data/barChartData';
import { categoryRankOptions } from '@/features/trend/lib/barOption';
import { Bar } from 'react-chartjs-2';

export const BarChart = () => {
  const chartData = useCategoryRank();
  console.log('');
  return (
    <div className='h-90'>
      <Bar data={chartData} options={categoryRankOptions} />
    </div>
  );
};
