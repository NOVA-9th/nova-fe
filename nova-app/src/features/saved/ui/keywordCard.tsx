'use client';

import { useState } from 'react';
import { EarthIcon, FileUser, ListFilter, Newspaper, Search } from 'lucide-react';
import { KeywordFilter } from '../mocks/KeywordFilter';
import { SectionHeader, SelectionChip, TextButton, TextInput } from '@/shared/ui';

export const KeywordCard = () => {
  const [value, setValue] = useState('');

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className='flex flex-col w-full h-fit justify-start items-center rounded-static-frame p-5 gap-5 bg-static'>
      <div className='flex w-full justify-center items-center gap-3'>
        <TextInput
          size='lg'
          variant='surface'
          data={false}
          value={value}
          placeholder='제목 혹은 키워드로 검색하기'
          onChange={onChange}
          icon={Search}
          className='flex-1'
        />
        <TextButton
          onClick={() => {}}
          size='lg'
          label='필터 초기화'
          leftIcon={ListFilter}
          style='surface'
          className='flex justify-center items-center px-padding-bold py-padding-regular rounded-interactive-default bg-surface'
        />
      </div>
      <div className='flex w-full h-fit items-center gap-8'>
        <div className='flex flex-col w-full h-full justify-start items-start gap-4'>
          <SectionHeader text='정렬' />
          <div className='flex gap-2'>
            <SelectionChip
              isShowChevron={false}
              size='md'
              style='surface'
              selected={true}
              label='최신순'
              onClick={() => {}}
            />
            <SelectionChip
              isShowChevron={false}
              size='md'
              style='surface'
              selected={false}
              label='관련도 순'
              onClick={() => {}}
            />
          </div>
        </div>
        <div className='flex flex-col w-full h-full justify-start items-start gap-4'>
          <SectionHeader text='유형' />
          <div className='flex gap-2'>
            <SelectionChip
              isShowChevron={false}
              icon={Newspaper}
              size='md'
              style='surface'
              selected={true}
              label='뉴스'
              onClick={() => {}}
            />
            <SelectionChip
              isShowChevron={false}
              icon={FileUser}
              size='md'
              style='surface'
              selected={false}
              label='채용'
              onClick={() => {}}
            />
            <SelectionChip
              isShowChevron={false}
              icon={EarthIcon}
              size='md'
              style='surface'
              selected={true}
              label='커뮤니티'
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full h-full justify-start items-start gap-4'>
        <SectionHeader text='정렬' />
        <div className='flex flex-wrap gap-2'>
          {KeywordFilter.map((keyword, index) => (
            <SelectionChip
              isShowChevron={false}
              key={index}
              size='md'
              style='surface'
              selected={false}
              label={`#${keyword.filter}`}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
