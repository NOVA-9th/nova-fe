'use client';

import { SelectionChip, TextBadge } from '@/shared/ui';
import { FilterSection } from '@/features/feed/ui/FilterSection';
import { useFeedFilterStore } from '@/features/feed/model/useFeedFilterStore';
import { useAuthStore } from '@/features/login/model/useAuthStore';
import { useMemberKeywordsQuery } from '@/shared/hooks/useMemberKeywords';

export const KeywordFilter = () => {
  const { selectedKeywords, resetKeywords, toggleKeyword } = useFeedFilterStore();
  const { memberId } = useAuthStore();
  const { data } = useMemberKeywordsQuery(memberId);

  return (
    <FilterSection
      title='키워드 필터'
      onReset={resetKeywords}
      badge={<TextBadge variant='surface' peak={false} size='lg' text={`${data?.totalCount}개`} />}
    >
      <div className='flex items-center gap-2 flex-wrap'>
        {data?.keywords.map((keyword) => (
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
