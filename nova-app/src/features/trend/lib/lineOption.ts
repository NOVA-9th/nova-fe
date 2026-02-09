// import type { ChartOptions, ScriptableScaleContext } from 'chart.js';

// export const createTrendOptions = (): ChartOptions<'line'> => ({
//   responsive: true,
//   maintainAspectRatio: false,

//   plugins: {
//     legend: { display: false },
//     tooltip: {
//       mode: 'index',
//       intersect: false,
//       callbacks: {
//         label: (context) => {
//           const dataset: any = context.dataset;
//           const index = context.dataIndex;

//           const rawValue = dataset.rawData?.[index]; // 실제 count

//           return `${dataset.label}: ${rawValue}`;
//         },
//       },
//     },
//   },

//   scales: {
//     x: {
//       offset: false,
//       grid: {
//         display: true,
//         drawOnChartArea: true, // 세로 격자 선 표시
//         drawTicks: false, // 튀어나오는 눈금 제거
//         tickBorderDash: [5, 5],
//         color: (context: ScriptableScaleContext) => {
//           // 마지막 index의 세로 격자 선 숨김
//           if (context.index === context.chart.scales.x.ticks.length - 1) return 'transparent';
//           return 'rgba(0,0,0,0.04)';
//         },
//       },
//       border: {
//         display: true,
//         color: 'rgba(0,0,0,0.1)',
//       },
//       ticks: {
//         maxTicksLimit: 7,
//         padding: 14,
//       },
//     },

//     y: {
//       min: 0,
//       max: 100,
//       grid: {
//         display: true,
//         drawTicks: false,
//         tickBorderDash: [6, 6],
//         color: (context: ScriptableScaleContext) => {
//           if (context.tick?.value === 100) return 'transparent';
//           return 'rgba(0,0,0,0.04)';
//         },
//       },
//       border: {
//         display: true,
//         color: 'rgba(0,0,0,0.1)',
//       },
//       ticks: {
//         stepSize: 20,
//         padding: 12,
//         callback: (value: number | string) => {
//           if (value === 0 || value === 100) return '';
//           return `${value}%`;
//         },
//       },
//     },
//   },
// });

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
        bodyColor: colors.textOptional,
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
            return 'rgba(0,0,0,0.04)';
          },
        },
        border: {
          display: true,
          color: 'rgba(0,0,0,0.1)',
        },
        ticks: {
          color: colors.textOptional, // ⭐ x축 label 색
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
            return 'rgba(0,0,0,0.04)';
          },
        },
        border: {
          display: true,
          color: 'rgba(0,0,0,0.1)',
        },
        ticks: {
          color: colors.textOptional, // ⭐ y축 label 색
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
