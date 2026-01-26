export const createTrendOptions = () => ({
  responsive: true, //반응형
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
    },
  },

  scales: {
    x: {
      offset: false, //중앙 정렬

      grid: {
        display: true,
        drawTicks: false,
        borderDash: [5, 5],
        lineDash: [5, 5],
      },
      border: {
        display: false, // x축 바닥 실선 제거
      },

      ticks: {
        maxTicksLimit: 7, // x축 갯수
        padding: 14,
      },
    },

    y: {
      min: 0,
      max: 100,

      ticks: {
        stepSize: 20, //
        padding: 12,

        callback: (value: number) => {
          if (value === 0 || value === 100) return '';
          return `${value}%`;
        },
      },
      grid: {
        display: true,
        drawTicks: false,
        lineDash: [6, 6],
        borderDash: [6, 6],
        drawBorder: false,
      },
    },
  },
});
