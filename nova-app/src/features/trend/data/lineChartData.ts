import { useGetKeywordTop } from '@/features/trend/api';
import { useKeywordStore } from '@/features/trend/model/useKeywordTop';
import type { ChartData, ScriptableContext } from 'chart.js';

export const useKeywordChart = () => {
  const { keywords } = useKeywordStore();
  // console.log(keywords);
  const { data } = useGetKeywordTop(); //서버 데이터
  // const
  // console.log(data);

  const COLORS = ['#287AF5', '#00BD75', '#F04C5A'];

  const selectedData = data?.trends.filter((trend) => keywords.includes(trend.keyword)) ?? [];
  const labels = selectedData[0]?.dailyCounts?.length
    ? selectedData[0]?.dailyCounts?.map((d) => d.date.slice(5))
    : ['']; //레이아웃 유지
  // const globalMax =
  //   Math.max(...selectedData.flatMap((trend) => (trend.dailyCounts ?? []).map((d) => d.count))) ||
  //   0;
  // console.log(selectedData);

  const trendChartData: ChartData<'line', number[], string> = {
    labels,
    datasets: selectedData.map((trend, idx) => {
      const dailyCounts = trend.dailyCounts ?? [];

      const max = Math.max(...dailyCounts.map((d) => d.count));

      const percentData = dailyCounts.map((d) =>
        max === 0 ? 0 : Math.round((d.count / max) * 100),
      );

      return {
        label: trend.keyword,
        data: percentData,
        borderColor: COLORS[idx],
        pointBackgroundColor: COLORS[idx],
        cubicInterpolationMode: 'monotone',
        borderWidth: 2,
        rawData: dailyCounts.map((d) => d.count),
        clip: false,
        pointRadius: (ctx: ScriptableContext<'line'>) => {
          const index = ctx.dataIndex;
          const lastIndex = ctx.dataset.data.length - 1;
          if (index === 0 || index === lastIndex) return 0;
          return 4;
        },
      };
    }),
  };

  return trendChartData;
};
