const EmptyFeed = ({ desc }: { desc: string }) => (
  <div className='flex flex-col items-center justify-center rounded-static-frame border border-outline bg-base p-10 text-center'>
    <p className='typo-headline-key text-base-color'>{desc}된 피드가 없습니다.</p>
    <p className='typo-body-base text-optional mt-2 break-keep'>필터를 바꿔서 다시 확인해보세요.</p>
  </div>
);

export default EmptyFeed;
