export interface LegendDataset {
  label: string;
  borderColor: string;
  pointBackgroundColor: string;
}

interface TrendLegendProps {
  datasets: LegendDataset[];
}

export const TrendLegend = ({ datasets }: TrendLegendProps) => {
  // console.log(datasets);
  return (
    <div className='relative'>
      <div
        className='flex justify-center gap-6 mb-3 pt-6 absolute lg:-bottom-8 -bottom-15 left-1/2 
  -translate-x-1/2'
      >
        {datasets.map((ds) => (
          <div key={ds.label} className='flex items-center gap-2'>
            <span className='relative w-5 h-3 flex items-center' style={{ color: ds.borderColor }}>
              <span className='absolute left-0 right-0 h-[2px] bg-current' />
              <span
                className={
                  'absolute left-1.5 z-10 w-2 h-2 rounded-full border-2 border-current bg-white '
                }
                style={{ borderColor: ds.pointBackgroundColor }}
              />
            </span>

            <span className='text-sm text-gray-600'>{ds.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
