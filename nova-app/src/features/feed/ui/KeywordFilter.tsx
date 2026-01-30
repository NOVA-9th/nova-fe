'use client';

import { SelectionChip, TextBadge } from '@/shared/ui';
import { useFeedFilters } from '@/features/feed/model/useFeedFilters';
import { KEYWORD_ITEMS } from '@/features/feed/data/FilterData';
import { FilterSection } from '@/features/feed/ui/FilterSection';

export const KeywordFilter = () => {
  const { selectedKeywords, resetKeywords, toggleKeyword } = useFeedFilters();

  return (
    <FilterSection
      title='키워드 필터'
      onReset={resetKeywords}
      badge={
        <TextBadge variant='surface' peak={false} size='lg' text={`${selectedKeywords.length}개`} />
      }
    >
      <div className='flex items-center gap-2 flex-wrap'>
        {KEYWORD_ITEMS.map((keyword) => (
          <SelectionChip
            key={keyword.id}
            label={`#${keyword.filter}`}
            selected={selectedKeywords.includes(keyword.filter)}
            isShowChevron={false}
            onClick={() => toggleKeyword(keyword.filter)}
            className='whitespace-nowrap'
          />
        ))}
      </div>
    </FilterSection>
  );
};
