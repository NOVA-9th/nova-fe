import { chartColors } from '@/features/trend/lib/chartColor';
import type { ChartOptions } from 'chart.js';

export const createCategoryRankOptions = (isDark: boolean): ChartOptions<'bar'> => {
  const colors = isDark ? chartColors.dark : chartColors.light;

  return {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,

    layout: {
      padding: {
        bottom: 20,
        left: 15,
      },
    },

    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },

    scales: {
      x: {
        grid: {
          drawOnChartArea: true,
          color: 'rgba(0,0,0,0.04)',

          drawTicks: false,
          // drawBorder: false,
        },
        ticks: {
          color: colors.textOptional,
          padding: 10,
          font: { size: 12 },
        },
        // border: {
        //   dash: [8, 8],
        // },
      },

      y: {
        offset: true,
        grid: {
          display: false,
          // drawBorder: false,
          color: 'rgba(0,0,0,0.04)',
          lineWidth: 1,
        },
        ticks: {
          color: colors.textOptional,
          padding: 2,
          font: { size: 12 },
        },
      },
    },
  };
};
