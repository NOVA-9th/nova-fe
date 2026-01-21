'use client';

import TextInput from '@/shared/ui/input/text_input/TextInput';
import { useState } from 'react';
import { ListFilter, Search } from 'lucide-react';
import { TextBtn } from '@/shared/ui/action/text_button/TextBtn';
import SectionHeader from '@/shared/ui/content/SectionHeader/SectionHeader';
import { SelectionChipBtn } from '@/shared/ui/action/selection_chip/SelectionChipBtn';
import { keywordFilter } from '../constants/keywordFilter';

export const KeywordSection = () => {
  const [value, setValue] = useState('');

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className='flex flex-col w-full h-full justify-start items-center p-5 gap-5 bg-white'>
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
        <TextBtn
          onClick={() => {}}
          size='lg'
          label='필터 초기화'
          leftIcon={<ListFilter />}
          style='surface'
          className='flex justify-center items-center px-padding-bold py-padding-regular rounded-md bg-surface'
        />
      </div>
      <div className='flex w-full h-fit items-center gap-8'>
        <div className='flex flex-col w-full h-full justify-start items-start gap-4'>
          <SectionHeader text='정렬' />
          <div className='flex gap-2'>
            <SelectionChipBtn
              size='md'
              style='surface'
              selected={true}
              label='최신순'
              onClick={() => {}}
            />
            <SelectionChipBtn
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
            <SelectionChipBtn
              size='md'
              style='surface'
              selected={true}
              label='뉴스'
              onClick={() => {}}
            />
            <SelectionChipBtn
              size='md'
              style='surface'
              selected={false}
              label='채용'
              onClick={() => {}}
            />
            <SelectionChipBtn
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
          {keywordFilter.map((keyword, index) => (
            <SelectionChipBtn
              key={index}
              size='sm'
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
