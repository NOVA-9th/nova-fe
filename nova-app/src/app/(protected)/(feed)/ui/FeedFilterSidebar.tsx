'use client';

import { PeriodFilter, SortFilter, TypeFilter, KeywordFilter } from '@/features/feed/ui';

const FeedFilterSidebar = () => {
  return (
    <aside className='w-80 space-y-4'>
      <SortFilter />
      <PeriodFilter />
      <TypeFilter />
      <KeywordFilter />
    </aside>
  );
};

export default FeedFilterSidebar;
