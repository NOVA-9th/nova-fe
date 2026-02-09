import { cn } from '@/shared/utils/cn';

interface TrendChartSkeletonProps {
  isLine?: boolean;
}

export const TrendChartSkeleton = ({ isLine = false }: TrendChartSkeletonProps) => {
  return (
    <div className='bg-base rounded-static-frame min-h-83 p-6 animate-pulse'>
      <div className='flex w-full items-center gap-2.5 mb-5'>
        <div className='h-7 w-40 rounded-md bg-surface' />
      </div>

      <div className='flex flex-col w-full gap-2 mb-5'>
        <div className='h-5 w-2/5 rounded-md bg-surface' />
      </div>

      <div
        className={cn(
          'relative h-80 w-full mb-6 rounded-interactive-default bg-surface',
          isLine && ' h-60',
        )}
      />

      <div className='flex justify-center gap-4 mt-10'>
        {isLine &&
          [...Array(3)].map((_, i) => (
            <div key={i} className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-full bg-surface' />
              <div className='w-12 h-3 rounded bg-surface' />
            </div>
          ))}
      </div>
    </div>
  );
};
