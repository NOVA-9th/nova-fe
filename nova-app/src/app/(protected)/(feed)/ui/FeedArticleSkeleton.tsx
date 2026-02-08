const ArticleCardSkeleton = () => {
  return (
    <article className='flex flex-col w-full h-fit items-start rounded-static-frame bg-white p-5 gap-5'>
      <div className='flex w-full h-fit justify-start items-center gap-2.5'>
        <div className='h-7 w-20 rounded-md bg-gray-200 animate-pulse' />
        <div className='h-7 w-24 rounded-md bg-gray-200 animate-pulse' />
      </div>

      <div className='flex flex-col w-full gap-2'>
        <div className='h-4 w-1/2 rounded-md bg-gray-200 animate-pulse' />
        <div className='h-5 w-4/5 rounded-md bg-gray-200 animate-pulse' />
      </div>

      <div className='flex flex-col w-full h-fit justify-start items-start rounded-interactive-default bg-surface p-4 gap-4'>
        <div className='h-6 w-20 rounded-md bg-gray-200 animate-pulse' />
        <div className='flex flex-col w-full gap-2'>
          <div className='h-4 w-full rounded-md bg-gray-200 animate-pulse' />
          <div className='h-4 w-11/12 rounded-md bg-gray-200 animate-pulse' />
          <div className='h-4 w-9/12 rounded-md bg-gray-200 animate-pulse' />
        </div>
      </div>

      <div className='flex w-full h-fit justify-between items-center gap-2.5'>
        <div className='flex gap-1.5 items-center'>
          <div className='h-5 w-24 rounded-md bg-gray-200 animate-pulse' />
          <div className='h-5 w-10 rounded-md bg-gray-200 animate-pulse' />
        </div>
        <div className='h-5 w-14 rounded-md bg-gray-200 animate-pulse' />
      </div>

      <div className='flex w-full h-fit justify-between items-start gap-2.5'>
        <div className='h-10 w-28 rounded-md bg-gray-200 animate-pulse' />
        <div className='flex gap-2.5'>
          <div className='h-10 w-16 rounded-md bg-gray-200 animate-pulse' />
          <div className='h-10 w-10 rounded-md bg-gray-200 animate-pulse' />
        </div>
      </div>
    </article>
  );
};

export default ArticleCardSkeleton;
