'use client';

import { SelectionChip } from '@/shared/ui';
import { SORT_ITEMS } from '@/features/feed/data/FilterData';
import { useFeedFilters } from '@/features/feed/model/useFeedFilters';
import { FilterSection } from '@/features/feed/ui/FilterSection';

const SortFilter = () => {
  const { resetSort, selectedSort, setSelectedSort } = useFeedFilters();

  return (
    <FilterSection title='정렬' onReset={resetSort}>
      <div className='flex items-center gap-2'>
        {SORT_ITEMS.map((option) => (
          <SelectionChip
            key={option}
            size='md'
            label={option}
            selected={selectedSort === option}
            isShowChevron={false}
            onClick={() => setSelectedSort(option)}
          />
        ))}
      </div>
    </FilterSection>
  );
};

export default SortFilter;
