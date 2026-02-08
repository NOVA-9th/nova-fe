'use client';

import { Button, ChipInput, SectionHeader, SelectionChip, TextBadge } from '@/shared/ui';
import { PERSONALIZATION_TEXT } from '../data/PersonalizationText';
import { useMemo, useState } from 'react';
import { showToast } from '@/shared/utils/toast';
import { useGetKeywords } from '@/shared/hooks/useGetKeywords';

export const PersonalizationSettings = () => {
  const [keywords, setKeywords] = useState<string[]>([
    ...PERSONALIZATION_TEXT.sections.keyword.initialKeywords,
  ]);

  const [inputValue, setInputValue] = useState('');

  const handleAddKeyword = (keyword: string) => {
    if (keywords.length >= 5) {
      showToast.error('키워드는 최대 5개까지 선택할 수 있어요.');
      return;
    }

    if (keywords.includes(keyword)) return;
    setKeywords((prev) => [...prev, keyword]);
  };

  const { data } = useGetKeywords();
  const suggestions = useMemo(() => data?.map((item) => item.name) ?? [], [data]);

  return (
    <section className='flex flex-col justify-start items-start w-full gap-5 bg-base rounded-static-frame p-5'>
      <SectionHeader text='개인화 설정' size='lg' />
      {/* 전공 분야 */}
      <div className='flex flex-col justify-start items-start w-full gap-3'>
        <SectionHeader text={PERSONALIZATION_TEXT.sections.major.title} peak={false} size='sm' />
        <div className='flex flex-wrap justify-start items-start w-full gap-2'>
          {PERSONALIZATION_TEXT.sections.major.options.map((option, index) => (
            <SelectionChip
              key={option}
              label={option}
              size='md'
              style='surface'
              selected={index === 0}
              isShowChevron={false}
            />
          ))}
        </div>
      </div>
      {/* 관심심 분야 */}
      <div className='flex flex-col justify-start items-start w-full gap-3'>
        <SectionHeader
          text={PERSONALIZATION_TEXT.sections.interests.title}
          peak={false}
          size='sm'
        />
        <div className='flex flex-wrap justify-start items-start w-full gap-2'>
          {PERSONALIZATION_TEXT.sections.interests.options.map((option, index) => (
            <SelectionChip
              key={option}
              label={option}
              size='md'
              style='surface'
              selected={index === 1 || index === 4}
              isShowChevron={false}
            />
          ))}
        </div>
      </div>
      {/* 기술 역량 */}
      <div className='flex flex-col justify-start items-start w-full gap-3'>
        <SectionHeader
          text={PERSONALIZATION_TEXT.sections.skillLevel.title}
          peak={false}
          size='sm'
        />
        <div className='flex flex-wrap justify-start items-start w-full gap-2'>
          {PERSONALIZATION_TEXT.sections.skillLevel.options.map((option, index) => (
            <SelectionChip
              key={option}
              label={option}
              size='md'
              style='surface'
              selected={index === 0}
              isShowChevron={false}
            />
          ))}
        </div>
      </div>

      {/* 관심 키워드 */}
      <div className='flex flex-col justify-start items-start w-full gap-3'>
        <div className='flex justify-between items-center w-full gap-3'>
          <div className='flex items-center gap-1.5'>
            <SectionHeader
              text={PERSONALIZATION_TEXT.sections.keyword.title}
              peak={false}
              size='sm'
            />
            <TextBadge text={`${keywords.length}개`} size='sm' variant='surface' peak={false} />
          </div>
          <span className='typo-callout-base text-optional text-right'>
            {PERSONALIZATION_TEXT.sections.keyword.helperText}
          </span>
        </div>

        <div className='flex flex-col lg:flex-row w-full items-center gap-3 min-w-0'>
          <ChipInput
            size='lg'
            variant='surface'
            data={false}
            placeholder='키워드를 입력하세요'
            className='w-full h-11 min-w-0'
            value={keywords}
            onChange={setKeywords}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onAdd={handleAddKeyword}
            suggestions={suggestions}
          />

          <Button
            size='lg'
            style='surface'
            peak={true}
            label={PERSONALIZATION_TEXT.sections.keyword.saveButtonLabel}
            className='w-full xl:w-auto'
          />
        </div>
      </div>
    </section>
  );
};
