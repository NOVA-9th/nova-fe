export const categoryRankOptions = {
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,

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
      grid: {
        color: 'rgba(0,0,0,0.04)',
        borderDash: [4, 4],
      },
      ticks: {
        color: '#9CA3AF',
      },
    },

    y: {
      offset: false, //
      grid: {
        display: false,
      },
      ticks: {
        color: '#111827',
      },
    },
  },
};
