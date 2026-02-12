'use client';

import { useCallback, useMemo } from 'react';
import { Grid2X2Icon, ListFilter, Search } from 'lucide-react';
import { SectionHeader, SelectionChip, Select, TextButton, TextInput } from '@/shared/ui';
import { useSavedFilterStore } from '@/features/saved/model/useSavedFilterStore';
import { SORT_ITEMS, TYPE_ITEMS } from '@/features/feed/data/FilterData';
import { useAuthStore } from '@/features/login/model/useAuthStore';
import { useMemberKeywordsQuery } from '@/shared/hooks/useMemberKeywords';

export const KeywordCard = () => {
  const searchKeyword = useSavedFilterStore((s) => s.searchKeyword);
  const selectedSort = useSavedFilterStore((s) => s.selectedSort);
  const selectedTypes = useSavedFilterStore((s) => s.selectedTypes);
  const selectedKeywords = useSavedFilterStore((s) => s.selectedKeywords);

  const setSearchKeyword = useSavedFilterStore((s) => s.setSearchKeyword);
  const setSelectedSort = useSavedFilterStore((s) => s.setSelectedSort);
  const setSelectedTypes = useSavedFilterStore((s) => s.setSelectedTypes);
  const toggleType = useSavedFilterStore((s) => s.toggleType);
  const toggleKeyword = useSavedFilterStore((s) => s.toggleKeyword);
  const resetAll = useSavedFilterStore((s) => s.resetAll);

  const memberId = useAuthStore((s) => s.memberId);
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
    <div className='bg-base rounded-static-frame p-5 flex flex-col gap-4 md:gap-5 border border-outline'>
      <div className='flex w-full gap-3 items-start lg:flex-row lg:items-center'>
        <TextInput
          size='lg'
          variant='surface'
          data={false}
          value={searchKeyword}
          placeholder='제목 혹은 키워드로 검색하기'
          onChange={setSearchKeyword}
          icon={Search}
          className='w-full overflow-hidden'
        />
        <TextButton
          onClick={resetAll}
          size='lg'
          label='초기화'
          leftIcon={ListFilter}
          style='surface'
          className='flex h-11 justify-center items-center whitespace-nowrap px-padding-bold py-padding-regular rounded-interactive-default bg-surface'
        />
      </div>

      <div className='flex flex-row w-full h-fit justify-between items-start gap-2 md:gap-8'>
        <div className='flex flex-1 md:flex-1 flex-col w-full md:w-fit h-full justify-start items-start gap-2 md:gap-4'>
          <SectionHeader text='정렬' />

          <div className='hidden md:flex gap-2'>
            {SORT_ITEMS.map((option, index) => (
              <SelectionChip
                key={option}
                index={index}
                size='md'
                label={option}
                selected={selectedSort === option}
                isShowChevron={false}
                onClick={handleSortClick}
              />
            ))}
          </div>

          <div className='md:hidden w-full'>
            <Select
              value={selectedSort}
              onValueChange={(value) => setSelectedSort(value as '최신순' | '관련도 순')}
              options={[
                { value: '최신순', label: '최신순' },
                { value: '관련도 순', label: '관련도 순' },
              ]}
              size='md'
              style='surface'
              className='w-full'
            />
          </div>
        </div>

        <div className='flex flex-2 md:flex-1 flex-col w-full md:w-fit h-full justify-start items-start gap-2 md:gap-4'>
          <SectionHeader text='유형' />
          <div className='hidden md:flex flex-wrap gap-2 w-full'>
            <SelectionChip
              index={0}
              isShowChevron={false}
              icon={Grid2X2Icon}
              size='md'
              style='surface'
              selected={selectedTypes.length === 0}
              label='전체'
              onClick={handleTypeClick}
            />

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
              />
            ))}
          </div>

          <div className='md:hidden w-full'>
            <Select
              value={selectedTypes.length === 0 ? '전체' : selectedTypes[0] || '전체'}
              onValueChange={(value) => {
                if (value === '전체') {
                  setSelectedTypes([]);
                } else {
                  setSelectedTypes([value as 'NEWS' | 'JOB' | 'COMMUNITY']);
                }
              }}
              options={[
                { value: '전체', label: '전체', icon: Grid2X2Icon },
                ...TYPE_ITEMS.map((item) => ({
                  value: item.value,
                  label: item.label,
                  icon: item.icon,
                })),
              ]}
              size='md'
              style='surface'
              className='w-full'
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col w-full h-full justify-start items-start gap-2 md:gap-4'>
        <div className='flex items-center justify-between w-full'>
          <SectionHeader text='키워드 필터' className='text-md md:typo-subhead-key' />
        </div>

        {/* 키워드: index + 단일 handler */}
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};
