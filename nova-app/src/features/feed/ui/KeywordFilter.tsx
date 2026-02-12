'use client';

import { useCallback, useMemo } from 'react';
import { SelectionChip, TextBadge } from '@/shared/ui';
import { FilterSection } from '@/features/feed/ui/FilterSection';
import { useFeedFilterStore } from '@/features/feed/model/useFeedFilterStore';
import { useAuthStore } from '@/features/login/model/useAuthStore';
import { useMemberKeywordsQuery } from '@/shared/hooks/useMemberKeywords';

export const KeywordFilter = () => {
  const selectedKeywords = useFeedFilterStore((s) => s.selectedKeywords);
  const toggleKeyword = useFeedFilterStore((s) => s.toggleKeyword);
  const resetKeywords = useFeedFilterStore((s) => s.resetKeywords);

  const { memberId } = useAuthStore();
  const { data } = useMemberKeywordsQuery(memberId);

  const keywords = useMemo(() => data?.keywords ?? [], [data?.keywords]);
  const totalCount = data?.totalCount ?? 0;

  const handleKeywordClick = useCallback(
    (index: number) => {
      const keyword = keywords[index];
      if (!keyword) return;
      toggleKeyword(keyword);
    },
    [keywords, toggleKeyword],
  );

  return (
    <FilterSection
      title='키워드 필터'
      onReset={resetKeywords}
      badge={<TextBadge variant='surface' peak={false} size='lg' text={`${totalCount}개`} />}
    >
      <div className='flex items-center gap-2 flex-wrap'>
        {keywords.map((keyword, index) => (
          <SelectionChip
            key={keyword}
            index={index}
            label={`#${keyword}`}
            selected={selectedKeywords.includes(keyword)}
            isShowChevron={false}
            onClick={handleKeywordClick}
            className='whitespace-nowrap'
          />
        ))}
      </div>
    </FilterSection>
  );
};
