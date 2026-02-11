import { chartColors } from '@/features/trend/lib/chartColor';
import type { ChartOptions, ScriptableScaleContext } from 'chart.js';

export const createTrendOptions = (isDark: boolean): ChartOptions<'line'> => {
  const colors = isDark ? chartColors.dark : chartColors.light;

  return {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => {
            const dataset: any = context.dataset;
            const index = context.dataIndex;
            const rawValue = dataset.rawData?.[index];
            return `${dataset.label}: ${rawValue}`;
          },
        },
      },
    },

    scales: {
      x: {
        offset: false,
        grid: {
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          tickBorderDash: [5, 5],
          color: (context: ScriptableScaleContext) => {
            if (context.index === context.chart.scales.x.ticks.length - 1) return 'transparent';
            return colors.gridColor;
          },
        },
        border: {
          display: true,
          color: colors.outline,
        },
        ticks: {
          color: colors.textOptional,
          maxTicksLimit: 7,
          padding: 14,
        },
      },

      y: {
        min: 0,
        max: 100,
        grid: {
          display: true,
          drawTicks: false,
          tickBorderDash: [6, 6],
          color: (context: ScriptableScaleContext) => {
            if (context.tick?.value === 100) return 'transparent';
            return colors.gridColor;
          },
        },
        border: {
          display: true,
          color: colors.outline,
        },
        ticks: {
          color: colors.textOptional,
          stepSize: 20,
          padding: 12,
          callback: (value: number | string) => {
            if (value === 0 || value === 100) return '';
            return `${value}%`;
          },
        },
      },
    },
  };
};
