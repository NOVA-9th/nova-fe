'use client';

import { Grid2X2Icon, EarthIcon, FileUser, ListFilter, Newspaper, Search } from 'lucide-react';
import { KeywordFilter } from '@/features/saved/mocks/KeywordFilter';
import { SectionHeader, SelectionChip, TextButton, TextInput } from '@/shared/ui';
import { useSavedFilterStore } from '@/features/saved/model/useSavedFilterStore';
import { TYPE_ITEMS } from '@/features/feed/data/FilterData';

export const KeywordCard = () => {
  const {
    searchKeyword,
    selectedSort,
    selectedTypes,
    selectedKeywords,
    setSearchKeyword,
    setSelectedSort,
    setSelectedTypes,
    toggleType,
    toggleKeyword,
    resetAll,
  } = useSavedFilterStore();

  return (
    <div className='bg-base rounded-static-frame p-5 flex flex-col gap-5'>
      <div className='flex w-full gap-3 flex-col items-start lg:flex-row lg:items-center'>
        <TextInput
          size='lg'
          variant='surface'
          data={false}
          value={searchKeyword}
          placeholder='제목 혹은 키워드로 검색하기'
          onChange={setSearchKeyword}
          icon={Search}
          className='w-full md:flex-1'
        />
        <TextButton
          onClick={resetAll}
          size='lg'
          label='필터 초기화'
          leftIcon={ListFilter}
          style='surface'
          className='flex h-11 justify-center items-center whitespace-nowrap px-padding-bold py-padding-regular rounded-interactive-default bg-surface'
        />
      </div>
      <div className='flex flex-col lg:flex-row w-full h-fit justify-between items-start gap-8'>
        <div className='flex flex-col w-fit h-full justify-start items-start gap-4'>
          <SectionHeader text='정렬' />
          <div className='flex gap-2'>
            <SelectionChip
              isShowChevron={false}
              size='md'
              style='surface'
              selected={selectedSort === '최신순'}
              label='최신순'
              onClick={() => setSelectedSort('최신순')}
            />
            <SelectionChip
              isShowChevron={false}
              size='md'
              style='surface'
              selected={selectedSort === '관련도 순'}
              label='관련도 순'
              onClick={() => setSelectedSort('관련도 순')}
            />
          </div>
        </div>
        <div className='flex flex-col w-fit h-full justify-start items-start gap-4'>
          <SectionHeader text='유형' />
          <div className='flex flex-wrap gap-2 w-full'>
            <SelectionChip
              isShowChevron={false}
              icon={Grid2X2Icon}
              size='md'
              style='surface'
              selected={selectedTypes.length === 0}
              label='전체'
              onClick={() => setSelectedTypes([])}
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
              />
            ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full h-full justify-start items-start gap-4'>
        <SectionHeader text='키워드 필터' />
        <div className='flex flex-wrap gap-2'>
          {KeywordFilter.map((keyword, index) => (
            <SelectionChip
              isShowChevron={false}
              key={index}
              size='md'
              style='surface'
              selected={selectedKeywords.includes(keyword.filter)}
              label={`#${keyword.filter}`}
              onClick={() => toggleKeyword(keyword.filter)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
