'use client';

import { Button, SectionHeader, SelectionChip, TextBadge } from '@/shared/ui';
import { PERSONALIZATION_TEXT } from '../data/PersonalizationText';
import { useState } from 'react';
import SearchInput from '@/features/onboarding/ui/SearchInput';

export const PersonalizationSettings = () => {
  const [keywords, setKeywords] = useState<string[]>([
    ...PERSONALIZATION_TEXT.sections.keyword.initialKeywords,
  ]);

  return (
    <section className='flex flex-col justify-start items-start w-full gap-5 bg-base rounded-static-frame p-5'>
      {/* 헤더 */}
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

      {/* 관심 분야 */}
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
        <div className='flex flex-col xl:flex-row w-full gap-3 items-start'>
          <SearchInput
            selectedKeywords={keywords}
            onChangeKeywords={setKeywords}
            showAddButton={false}
            description={true}
            title='관심 키워드'
            className='flex-1 min-w-0'
          />

          <Button
            size='lg'
            style='surface'
            peak={true}
            label={PERSONALIZATION_TEXT.sections.keyword.saveButtonLabel}
            className='w-full xl:w-auto shrink-0'
          />
        </div>
      </div>
    </section>
  );
};
