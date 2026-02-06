'use client';

import { SelectionChip } from '@/shared/ui';
import { PERIOD_ITEMS } from '@/features/feed/data/FilterData';
import { FilterSection } from '@/features/feed/ui/FilterSection';
import { useFeedFilterStore } from '@/features/feed/model/useFeedFilterStore';

export const PeriodFilter = () => {
  const { resetPeriod, selectedPeriod, setSelectedPeriod } = useFeedFilterStore();

  return (
    <FilterSection title='업로드 기간' onReset={resetPeriod}>
      <div className='flex items-center gap-2'>
        {PERIOD_ITEMS.map((option) => (
          <SelectionChip
            key={option}
            label={option}
            selected={selectedPeriod === option}
            isShowChevron={false}
            onClick={() => setSelectedPeriod(option as any)}
          />
        ))}
      </div>
    </FilterSection>
  );
};
