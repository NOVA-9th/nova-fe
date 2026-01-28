import { Button, ChipInput, SectionHeader, SelectionChip, TextBadge } from '@/shared/ui';
import { PERSONALIZATION_TEXT } from '../data/PersonalizationText';

export const PersonalizationSettings = () => {
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
            <TextBadge
              text={`${PERSONALIZATION_TEXT.sections.keyword.initialKeywords.length}개`}
              size='sm'
              variant='surface'
              peak={false}
            />
          </div>
          <span className='typo-callout-base text-optional text-right'>
            {PERSONALIZATION_TEXT.sections.keyword.helperText}
          </span>
        </div>

        <div className='flex w-full items-start gap-3'>
          <ChipInput size='lg' variant='surface' data={false} placeholder='' className='flex-1' />

          <Button
            size='lg'
            style='surface'
            peak={true}
            label={PERSONALIZATION_TEXT.sections.keyword.saveButtonLabel}
          />
        </div>
      </div>
    </section>
  );
};
