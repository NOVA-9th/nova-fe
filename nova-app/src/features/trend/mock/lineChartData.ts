import type { ChartData, ScriptableContext } from 'chart.js';
export const trendChartData: ChartData<'line', number[], string> = {
  labels: ['1월 15일', '1월 16일', '1월 17일', '1월 18일', '1월 19일', '1월 20일', '1월 21일'],
  datasets: [
    {
      label: 'LLM',
      data: [25, 23, 28, 25, 31, 28, 33],
      borderColor: '#287AF5',
      pointBackgroundColor: '#287AF5',
      cubicInterpolationMode: 'monotone',
      borderWidth: 2, //선 굵기
      pointRadius: (ctx: ScriptableContext<'line'>) => {
        const index = ctx.dataIndex;
        const lastIndex = ctx.dataset.data.length - 1;
        if (index === 0 || index === lastIndex) return 0;
        return 4;
      },
      clip: false,
      //   pointRadius: 6,
    },
    {
      label: 'React',
      data: [52, 55, 51, 66, 62, 70, 78],
      borderColor: '#00BD75',
      pointBackgroundColor: '#00BD75',
      cubicInterpolationMode: 'monotone',
      clip: false,
      borderWidth: 2,
      pointRadius: (ctx: ScriptableContext<'line'>) => {
        const index = ctx.dataIndex;
        const lastIndex = ctx.dataset.data.length - 1;
        if (index === 0 || index === lastIndex) return 0;
        return 4;
      },
      //   pointRadius: 6,
    },
  ],
};
