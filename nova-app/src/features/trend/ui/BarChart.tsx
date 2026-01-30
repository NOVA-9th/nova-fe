'use client';
import { categoryRankOptions } from '@/features/trend/lib/barOption';
import { categoryRankData } from '@/features/trend/mock/barChartData';
import { Bar } from 'react-chartjs-2';

export const BarChart = () => {
  return (
    <div className='h-90'>
      <Bar data={categoryRankData} options={categoryRankOptions} />
    </div>
  );
};
