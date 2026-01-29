const categoryRankOptions = {
  indexAxis: 'y' as const, //y축배치
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      bottom: 20,
      left: 15,
    },
  },

  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },

  scales: {
    x: {
      // suggestedMax: 3600,
      grid: {
        drawOnChartArea: true,
        color: 'rgba(0,0,0,0.04)',
        borderDash: [4, 4],
        drawTicks: false, //세로선 방지
        drawBorder: false,
        lineWidth: 1,
      },
      ticks: {
        color: 'rgba(21, 22, 24, 0.48)', //text-optional
        ticks: {
          padding: 10, // x축 숫자와 그래프 사이 간격
        },
        font: {
          size: 12,
        },
      },
    },

    y: {
      offset: true,
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        color: 'rgba(21, 22, 24, 0.48)', //text-optional
        padding: 2,
        // align: 'center',
        // crossAlign: 'center',
        // padding: 10,
        font: {
          size: 12,
        },
      },
    },
  },
};
export default categoryRankOptions;
