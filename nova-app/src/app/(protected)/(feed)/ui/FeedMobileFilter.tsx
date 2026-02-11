'use client';

import { Grid2X2Icon } from 'lucide-react';
import { SectionHeader, SelectionChip } from '@/shared/ui';
import { PERIOD_ITEMS, SORT_ITEMS, TYPE_ITEMS } from '@/features/feed/data/FilterData';
import { useAuthStore } from '@/features/login/model/useAuthStore';
import { useMemberKeywordsQuery } from '@/shared/hooks/useMemberKeywords';
import { useFeedFilterStore } from '@/features/feed/model/useFeedFilterStore';

export const FeedMobileFilter = () => {
  const {
    selectedSort,
    selectedPeriod,
    selectedTypes,
    selectedKeywords,
    setSelectedSort,
    setSelectedPeriod,
    setSelectedTypes,
    toggleType,
    toggleKeyword,
  } = useFeedFilterStore();

  const { memberId } = useAuthStore();
  const { data } = useMemberKeywordsQuery(memberId);

  return (
    <section className='xl:hidden bg-base rounded-static-frame border border-outline p-5 space-y-5'>
      <section className='grid grid-cols-2 gap-4'>
        <div className='md:space-y-4 space-y-2'>
          <SectionHeader text='정렬' />
          <div className='flex flex-wrap gap-2'>
            {SORT_ITEMS.map((option) => (
              <SelectionChip
                key={option}
                size='md'
                label={option}
                selected={selectedSort === option}
                isShowChevron={false}
                onClick={() => setSelectedSort(option)}
                className='shrink-0'
              />
            ))}
          </div>
        </div>

        <div className='md:space-y-4 space-y-2'>
          <SectionHeader text='업로드 기간' />
          <div className='flex flex-wrap gap-2'>
            {PERIOD_ITEMS.map((option) => (
              <SelectionChip
                key={option}
                label={option}
                selected={selectedPeriod === option}
                isShowChevron={false}
                onClick={() => setSelectedPeriod(option)}
                className='shrink-0'
              />
            ))}
          </div>
        </div>
      </section>

      <section className='md:space-y-4 space-y-2'>
        <SectionHeader text='유형' />
        <div className='flex flex-wrap gap-2'>
          <SelectionChip
            isShowChevron={false}
            icon={Grid2X2Icon}
            size='md'
            style='surface'
            selected={selectedTypes.length === 0}
            label='전체'
            onClick={() => setSelectedTypes([])}
            className='shrink-0'
          />
          {TYPE_ITEMS.map((item) => (
            <SelectionChip
              key={item.value}
              isShowChevron={false}
              icon={item.icon}
              size='md'
              style='surface'
              selected={selectedTypes.includes(item.value)}
              label={item.label}
              onClick={() => toggleType(item.value)}
              className='shrink-0'
            />
          ))}
        </div>
      </section>

      <section className='md:space-y-4 space-y-2'>
        <SectionHeader text='키워드 필터' />

        <div className='flex flex-wrap gap-2'>
          {data?.keywords?.map((keyword) => (
            <SelectionChip
              isShowChevron={false}
              key={keyword}
              size='md'
              style='surface'
              selected={selectedKeywords.includes(keyword)}
              label={`#${keyword}`}
              onClick={() => toggleKeyword(keyword)}
              className='whitespace-nowrap shrink-0'
            />
          ))}
        </div>
      </section>
    </section>
  );
};
