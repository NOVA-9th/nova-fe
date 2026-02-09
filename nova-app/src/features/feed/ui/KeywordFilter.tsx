'use client';

import { SelectionChip, TextBadge } from '@/shared/ui';
import { FilterSection } from '@/features/feed/ui/FilterSection';
import { useFeedFilterStore } from '@/features/feed/model/useFeedFilterStore';
import { useAuthStore } from '@/features/login/model/useAuthStore';
import { usePersonalization } from '@/shared/hooks/usePersonalization';

export const KeywordFilter = () => {
  const { selectedKeywords, resetKeywords, toggleKeyword } = useFeedFilterStore();
  const { memberId } = useAuthStore();

  const { data: personalization } = usePersonalization(memberId);
  const keywords = personalization?.data?.keywords ?? [];

  return (
    <FilterSection
      title='키워드 필터'
      onReset={resetKeywords}
      badge={
        <TextBadge variant='surface' peak={false} size='lg' text={`${selectedKeywords.length}개`} />
      }
    >
      <div className='flex items-center gap-2 flex-wrap'>
        {keywords.map((keyword) => (
          <SelectionChip
            key={keyword}
            label={`#${keyword}`}
            selected={selectedKeywords.includes(keyword)}
            isShowChevron={false}
            onClick={() => toggleKeyword(keyword)}
            className='whitespace-nowrap'
          />
        ))}
      </div>
    </FilterSection>
  );
};
