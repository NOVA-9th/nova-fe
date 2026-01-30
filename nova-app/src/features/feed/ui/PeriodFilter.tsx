'use client';

import { SelectionChip } from '@/shared/ui';
import { useFeedFilters } from '@/features/feed/model/useFeedFilters';
import { PERIOD_ITEMS } from '@/features/feed/data/FilterData';
import { FilterSection } from '@/features/feed/ui/FilterSection';

export const PeriodFilter = () => {
  const { resetPeriod, selectedPeriod, setSelectedPeriod } = useFeedFilters();

  return (
    <FilterSection title='업로드 기간' onReset={resetPeriod}>
      <div className='flex items-center gap-2'>
        {PERIOD_ITEMS.map((option) => (
          <SelectionChip
            key={option}
            label={option}
            selected={selectedPeriod === option}
            isShowChevron={false}
            onClick={() => setSelectedPeriod(option)}
          />
        ))}
      </div>
    </FilterSection>
  );
};
