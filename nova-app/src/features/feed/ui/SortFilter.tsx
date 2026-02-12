'use client';

import { useCallback } from 'react';
import { SelectionChip } from '@/shared/ui';
import { SORT_ITEMS } from '@/features/feed/data/FilterData';
import { FilterSection } from '@/features/feed/ui/FilterSection';
import { useFeedFilterStore } from '@/features/feed/model/useFeedFilterStore';

export const SortFilter = () => {
  const selectedSort = useFeedFilterStore((s) => s.selectedSort);
  const setSelectedSort = useFeedFilterStore((s) => s.setSelectedSort);
  const resetSort = useFeedFilterStore((s) => s.resetSort);

  const handleSortClick = useCallback(
    (index: number) => {
      const next = SORT_ITEMS[index];
      if (!next) return;
      setSelectedSort(next);
    },
    [setSelectedSort],
  );

  return (
    <FilterSection title='정렬' onReset={resetSort}>
      <div className='flex items-center gap-2'>
        {SORT_ITEMS.map((option, index) => (
          <SelectionChip
            key={option}
            index={index}
            size='md'
            label={option}
            selected={selectedSort === option}
            isShowChevron={false}
            onClick={handleSortClick}
          />
        ))}
      </div>
    </FilterSection>
  );
};
