'use client';

import { Grid2X2Icon, EarthIcon, FileUser, ListFilter, Newspaper, Search } from 'lucide-react';
import { KeywordFilter } from '@/features/saved/mocks/KeywordFilter';
import { SectionHeader, SelectionChip, Select, TextButton, TextInput } from '@/shared/ui';
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
    <div className='bg-base rounded-static-frame p-5 flex flex-col gap-4 md:gap-5'>
      <div className='flex w-full gap-3 items-start lg:flex-row lg:items-center'>
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
          className='hidden md:flex h-11 justify-center items-center whitespace-nowrap px-padding-bold py-padding-regular rounded-interactive-default bg-surface'
        />
      </div>
      <div className='flex flex-row w-full h-fit justify-between items-start gap-2 md:gap-8'>
        <div className='flex flex-1 md:flex-1 flex-col w-full md:w-fit h-full justify-start items-start gap-2 md:gap-4'>
          <SectionHeader text='정렬' />
          {/* 데스크톱: SelectionChip */}
          <div className='hidden md:flex gap-2'>
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
          {/* 모바일: Select 드롭다운 */}
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
          {/* 데스크톱: SelectionChip */}
          <div className='hidden md:flex flex-wrap gap-2 w-full'>
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
          {/* 모바일: Select 드롭다운 */}
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
                ...TYPE_ITEMS.map((item) => ({ value: item.value, label: item.label, icon: item.icon })),
              ]}
              size='md'
              style='surface'
              className='w-full'
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full h-full justify-start items-start gap-2 md:gap-4'>
        <SectionHeader text='키워드 필터' className='text-md md:typo-subhead-key' />
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
