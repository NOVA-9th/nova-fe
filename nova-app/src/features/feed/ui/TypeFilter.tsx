'use client';

import { useCallback } from 'react';
import { SelectionChip } from '@/shared/ui';
import { Grid2X2Icon } from 'lucide-react';
import { TYPE_ITEMS } from '@/features/feed/data/FilterData';
import { FilterSection } from '@/features/feed/ui/FilterSection';
import { useFeedFilterStore } from '@/features/feed/model/useFeedFilterStore';

export const TypeFilter = () => {
  const selectedTypes = useFeedFilterStore((s) => s.selectedTypes);
  const resetTypes = useFeedFilterStore((s) => s.resetTypes);
  const setSelectedTypes = useFeedFilterStore((s) => s.setSelectedTypes);
  const toggleType = useFeedFilterStore((s) => s.toggleType);

  const handleTypeClick = useCallback(
    (index: number) => {
      if (index === 0) {
        setSelectedTypes([]);
        return;
      }
      const item = TYPE_ITEMS[index - 1];
      if (!item) return;
      toggleType(item.value);
    },
    [setSelectedTypes, toggleType],
  );

  return (
    <FilterSection title='유형' onReset={resetTypes} className='space-y-4'>
      <div className='flex items-center gap-2 flex-wrap'>
        <SelectionChip
          index={0}
          label='전체'
          selected={selectedTypes.length === 0}
          isShowChevron={false}
          icon={Grid2X2Icon}
          onClick={handleTypeClick}
        />
      </div>

      <div className='flex items-center gap-2 flex-wrap'>
        {TYPE_ITEMS.map((item, idx) => (
          <SelectionChip
            key={item.value}
            index={idx + 1}
            label={item.label}
            selected={selectedTypes.includes(item.value)}
            isShowChevron={false}
            icon={item.icon}
            onClick={handleTypeClick}
          />
        ))}
      </div>
    </FilterSection>
  );
};
