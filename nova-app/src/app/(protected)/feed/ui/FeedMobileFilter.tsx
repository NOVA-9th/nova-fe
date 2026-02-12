'use client';

import { Grid2X2Icon } from 'lucide-react';
import { SectionHeader, SelectionChip } from '@/shared/ui';
import { PERIOD_ITEMS, SORT_ITEMS, TYPE_ITEMS } from '@/features/feed/data/FilterData';
import { useAuthStore } from '@/features/login/model/useAuthStore';
import { useMemberKeywordsQuery } from '@/shared/hooks/useMemberKeywords';
import { useFeedFilterStore } from '@/features/feed/model/useFeedFilterStore';
import { useCallback, useMemo } from 'react';

const FeedMobileFilter = () => {
  const selectedSort = useFeedFilterStore((s) => s.selectedSort);
  const selectedPeriod = useFeedFilterStore((s) => s.selectedPeriod);
  const selectedTypes = useFeedFilterStore((s) => s.selectedTypes);
  const selectedKeywords = useFeedFilterStore((s) => s.selectedKeywords);

  const setSelectedSort = useFeedFilterStore((s) => s.setSelectedSort);
  const setSelectedPeriod = useFeedFilterStore((s) => s.setSelectedPeriod);
  const setSelectedTypes = useFeedFilterStore((s) => s.setSelectedTypes);
  const toggleType = useFeedFilterStore((s) => s.toggleType);
  const toggleKeyword = useFeedFilterStore((s) => s.toggleKeyword);

  const { memberId } = useAuthStore();
  const { data } = useMemberKeywordsQuery(memberId);

  const keywords = useMemo(() => data?.keywords ?? [], [data?.keywords]);

  const handleSortClick = useCallback(
    (index: number) => {
      const next = SORT_ITEMS[index];
      if (!next) return;
      setSelectedSort(next);
    },
    [setSelectedSort],
  );

  const handlePeriodClick = useCallback(
    (index: number) => {
      const next = PERIOD_ITEMS[index];
      if (!next) return;
      setSelectedPeriod(next);
    },
    [setSelectedPeriod],
  );

  // 유형: index 0 = 전체, 1.. = TYPE_ITEMS[index-1]
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

  const handleKeywordClick = useCallback(
    (index: number) => {
      const keyword = keywords[index];
      if (!keyword) return;
      toggleKeyword(keyword);
    },
    [keywords, toggleKeyword],
  );

  return (
    <section className='xl:hidden bg-base rounded-static-frame border border-outline p-5 space-y-5'>
      <section className='grid grid-cols-2 gap-4'>
        <div className='md:space-y-4 space-y-2'>
          <SectionHeader text='정렬' />
          <div className='flex flex-wrap gap-2'>
            {SORT_ITEMS.map((option, index) => (
              <SelectionChip
                key={option}
                index={index}
                size='md'
                label={option}
                selected={selectedSort === option}
                isShowChevron={false}
                onClick={handleSortClick}
                className='shrink-0'
              />
            ))}
          </div>
        </div>

        <div className='md:space-y-4 space-y-2'>
          <SectionHeader text='업로드 기간' />
          <div className='flex flex-wrap gap-2'>
            {PERIOD_ITEMS.map((option, index) => (
              <SelectionChip
                key={option}
                index={index}
                label={option}
                selected={selectedPeriod === option}
                isShowChevron={false}
                onClick={handlePeriodClick}
                className='shrink-0'
              />
            ))}
          </div>
        </div>
      </section>

      <section className='md:space-y-4 space-y-2'>
        <SectionHeader text='유형' />
        <div className='flex flex-wrap gap-2'>
          {/* 전체 */}
          <SelectionChip
            index={0}
            isShowChevron={false}
            icon={Grid2X2Icon}
            size='md'
            style='surface'
            selected={selectedTypes.length === 0}
            label='전체'
            onClick={handleTypeClick}
            className='shrink-0'
          />

          {/* 개별 타입 */}
          {TYPE_ITEMS.map((item, idx) => (
            <SelectionChip
              key={item.value}
              index={idx + 1}
              isShowChevron={false}
              icon={item.icon}
              size='md'
              style='surface'
              selected={selectedTypes.includes(item.value)}
              label={item.label}
              onClick={handleTypeClick}
              className='shrink-0'
            />
          ))}
        </div>
      </section>

      <section className='md:space-y-4 space-y-2'>
        <SectionHeader text='키워드 필터' />
        <div className='flex flex-wrap gap-2'>
          {keywords.map((keyword, index) => (
            <SelectionChip
              key={keyword}
              index={index}
              isShowChevron={false}
              size='md'
              style='surface'
              selected={selectedKeywords.includes(keyword)}
              label={`#${keyword}`}
              onClick={handleKeywordClick}
              className='whitespace-nowrap shrink-0'
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default FeedMobileFilter;
