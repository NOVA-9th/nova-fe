import { chartColors } from '@/features/trend/lib/chartColor';
import type { ChartOptions } from 'chart.js';

export const createCategoryRankOptions = (
  isDark: boolean,
  hasData: boolean,
): ChartOptions<'bar'> => {
  const colors = isDark ? chartColors.dark : chartColors.light;

  return {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,

    layout: {
      padding: {
        top: 10,
        left: 15,
      },
    },

    plugins: {
      legend: { display: false },
      tooltip: { enabled: hasData },
    },

    scales: {
      x: {
        // display: hasData,
        grid: {
          drawOnChartArea: true,
          color: 'rgba(0,0,0,0.04)',

          drawTicks: false,
          // drawBorder: false,
        },
        ticks: {
          color: hasData ? colors.textOptional : 'transparent',
          padding: 10,
          font: { size: 12 },
        },
        border: {
          display: true,
          color: colors.outline,
          width: 1,
        },
      },

      y: {
        offset: true,
        grid: {
          display: true,
          // drawBorder: false,
          color: 'rgba(0,0,0,0.04)',
          lineWidth: 1,
        },

        ticks: {
          color: colors.textOptional,
          padding: 2,
          font: { size: 12 },
          callback: function (value) {
            if (typeof value !== 'number') return value;
            const label = this.getLabelForValue(value);
            return label.split(' ');
          },
        },
        border: {
          display: true,
          color: colors.outline,
          width: 1,
        },
        // afterFit: (axis) => {
        //   axis.width = 70; //키워드 차지 넓이
        // },
      },
    },
  };
};
