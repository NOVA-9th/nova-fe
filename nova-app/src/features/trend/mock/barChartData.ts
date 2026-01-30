import type { ChartData } from 'chart.js';

export const categoryRankData: ChartData<'bar', number[], string> = {
  labels: ['Frontend', 'AI / ML', 'Backend', 'DevOps', 'Cloud', 'Database'],
  datasets: [
    {
      data: [3200, 2100, 3400, 2300, 1500, 1100],
      backgroundColor: '#151618',
      borderRadius: 16,
      categoryPercentage: 1,
      barPercentage: 0.8,
      clip: false,
    },
  ],
};
