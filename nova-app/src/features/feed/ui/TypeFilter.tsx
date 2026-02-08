'use client';

import { SelectionChip } from '@/shared/ui';
import { Grid2X2Icon } from 'lucide-react';
import { TYPE_ITEMS } from '@/features/feed/data/FilterData';
import { FilterSection } from '@/features/feed/ui/FilterSection';
import { useFeedFilterStore } from '@/features/feed/model/useFeedFilterStore';

export const TypeFilter = () => {
  const { resetTypes, selectedTypes, setSelectedTypes, toggleType } = useFeedFilterStore();

  return (
    <FilterSection title='유형' onReset={resetTypes} className='space-y-4'>
      <div className='flex items-center gap-2 flex-wrap'>
        <SelectionChip
          label='전체'
          selected={selectedTypes.length === 0}
          isShowChevron={false}
          icon={Grid2X2Icon}
          onClick={() => setSelectedTypes([])}
        />
      </div>
      <div className='flex items-center gap-2 flex-wrap'>
        {TYPE_ITEMS.map((item) => (
          <SelectionChip
            key={item.value}
            label={item.label}
            selected={selectedTypes.includes(item.value)}
            isShowChevron={false}
            icon={item.icon}
            onClick={() => toggleType(item.value)}
          />
        ))}
      </div>
    </FilterSection>
  );
};
