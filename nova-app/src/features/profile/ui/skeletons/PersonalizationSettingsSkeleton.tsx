'use client';

import { Button, SectionHeader } from '@/shared/ui';
import { PERSONALIZATION_TEXT } from '../../data/PersonalizationText';

/**
 * 개인화 설정 섹션 로딩 스켈레톤.
 * 실제 구조와 동일하게 섹션 제목은 그대로 두고, Badge(칩) 영역과 관심 키워드 input·Badge만 스켈레톤 적용.
 */
export const PersonalizationSettingsSkeleton = () => {
  return (
    <section className='flex flex-col justify-start items-start w-full gap-5 bg-base rounded-static-frame p-5'>
      <SectionHeader text='개인화 설정' size='lg' />
      {/* 전공 분야 */}
      <div className='flex flex-col justify-start items-start w-full gap-3'>
        <SectionHeader
          text={PERSONALIZATION_TEXT.sections.major.title}
          peak={false}
          size='sm'
        />
        <div className='flex flex-wrap justify-start items-start w-full gap-2'>
          {PERSONALIZATION_TEXT.sections.major.options.map((_, i) => (
            <div
              key={i}
              className='h-8 w-16 bg-alternative rounded-full animate-pulse'
              aria-hidden
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
          {PERSONALIZATION_TEXT.sections.interests.options.map((_, i) => (
            <div
              key={i}
              className='h-8 w-20 bg-alternative rounded-full animate-pulse'
              aria-hidden
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
          {PERSONALIZATION_TEXT.sections.skillLevel.options.map((_, i) => (
            <div
              key={i}
              className='h-8 w-16 bg-alternative rounded-full animate-pulse'
              aria-hidden
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
            <div className='h-5 w-10 bg-alternative rounded animate-pulse shrink-0' aria-hidden />
          </div>
          <span className='typo-callout-base text-optional text-right'>
            {PERSONALIZATION_TEXT.sections.keyword.helperText}
          </span>
        </div>
        <div className='flex flex-col lg:flex-row w-full items-center gap-3 min-w-0'>
          <div
            className='w-full h-11 min-w-0 rounded bg-alternative animate-pulse'
            aria-hidden
          />
          <Button
            size='lg'
            style='surface'
            peak={true}
            label={PERSONALIZATION_TEXT.sections.keyword.saveButtonLabel}
            className='w-full xl:w-auto'
            onClick={() => {}}
            disabled
          />
        </div>
      </div>
    </section>
  );
};
