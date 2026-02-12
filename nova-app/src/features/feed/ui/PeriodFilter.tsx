'use client';

import { useCallback } from 'react';
import { SelectionChip } from '@/shared/ui';
import { PERIOD_ITEMS } from '@/features/feed/data/FilterData';
import { FilterSection } from '@/features/feed/ui/FilterSection';
import { useFeedFilterStore } from '@/features/feed/model/useFeedFilterStore';

export const PeriodFilter = () => {
  const selectedPeriod = useFeedFilterStore((s) => s.selectedPeriod);
  const setSelectedPeriod = useFeedFilterStore((s) => s.setSelectedPeriod);
  const resetPeriod = useFeedFilterStore((s) => s.resetPeriod);

  const handlePeriodClick = useCallback(
    (index: number) => {
      const next = PERIOD_ITEMS[index];
      if (!next) return;
      setSelectedPeriod(next);
    },
    [setSelectedPeriod],
  );

  return (
    <FilterSection title='업로드 기간' onReset={resetPeriod}>
      <div className='flex items-center gap-2'>
        {PERIOD_ITEMS.map((option, index) => (
          <SelectionChip
            key={option}
            index={index}
            label={option}
            selected={selectedPeriod === option}
            isShowChevron={false}
            onClick={handlePeriodClick}
          />
        ))}
      </div>
    </FilterSection>
  );
};
