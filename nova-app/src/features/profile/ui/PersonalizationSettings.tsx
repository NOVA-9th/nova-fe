'use client';

import { Button, ChipInput, SectionHeader, SelectionChip, TextBadge } from '@/shared/ui';
import { PERSONALIZATION_TEXT } from '../data/PersonalizationText';
import { usePersonalization, useUpdatePersonalization } from '../hooks/useProfile';
import { MemberLevel } from '../api/types';
import { useState, useEffect } from 'react';

interface PersonalizationSettingsProps {
  memberId: number | null;
}

// MemberLevel을 한국어로 매핑
const memberLevelMap: Record<MemberLevel, string> = {
  [MemberLevel.NOVICE]: '입문자',
  [MemberLevel.BEGINNER]: '초급자',
  [MemberLevel.INTERMEDIATE]: '중급자',
  [MemberLevel.ADVANCED]: '숙련자',
};

export const PersonalizationSettings = ({ memberId }: PersonalizationSettingsProps) => {
  const { data: personalizationData, isLoading } = usePersonalization(memberId);
  const updatePersonalizationMutation = useUpdatePersonalization();

  const [selectedMajor, setSelectedMajor] = useState<number | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<MemberLevel | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [background, setBackground] = useState<string>('');

  // API 데이터가 로드되면 상태 초기화
  useEffect(() => {
    if (personalizationData?.data) {
      const data = personalizationData.data;
      setSelectedInterests(data.interests || []);
      setSelectedLevel(data.level);
      setKeywords(data.keywords || []);
      setBackground(data.background || '');
    }
  }, [personalizationData]);

  const handleSave = () => {
    if (!memberId || selectedLevel === null) return;

    // 키워드 개수 제한 확인
    if (keywords.length > PERSONALIZATION_TEXT.sections.keyword.maxCount) {
      alert(`키워드는 최대 ${PERSONALIZATION_TEXT.sections.keyword.maxCount}개까지 선택할 수 있습니다.`);
      return;
    }

    updatePersonalizationMutation.mutate(
      {
        memberId,
        requestDto: {
          level: selectedLevel,
          background: background,
          interests: selectedInterests,
          keywords: keywords,
        },
      },
      {
        onSuccess: () => {
          // 성공 시 처리 (캐시 자동 업데이트됨)
        },
      }
    );
  };

  const toggleInterest = (index: number) => {
    setSelectedInterests((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const getLevelIndex = (level: MemberLevel | null): number => {
    if (!level) return 0;
    const levels = [
      MemberLevel.NOVICE,
      MemberLevel.BEGINNER,
      MemberLevel.INTERMEDIATE,
      MemberLevel.ADVANCED,
    ];
    return levels.indexOf(level);
  };

  const handleLevelChange = (index: number) => {
    const levels = [
      MemberLevel.NOVICE,
      MemberLevel.BEGINNER,
      MemberLevel.INTERMEDIATE,
      MemberLevel.ADVANCED,
    ];
    setSelectedLevel(levels[index]);
  };

  const handleMajorChange = (index: number) => {
    // 전공 분야는 하나만 선택 가능
    const selectedMajorOption = PERSONALIZATION_TEXT.sections.major.options[index];
    setBackground(selectedMajorOption);
  };

  // background 값이 전공 분야 옵션 중 하나와 일치하는지 확인
  const getSelectedMajorIndex = (): number | null => {
    const index = PERSONALIZATION_TEXT.sections.major.options.findIndex(
      (option) => option === background
    );
    return index !== -1 ? index : null;
  };

  if (isLoading) {
    return (
      <section className='flex flex-col justify-start items-start w-full gap-5 bg-base rounded-static-frame p-5'>
        <SectionHeader text='개인화 설정' size='lg' />
        <div className='text-optional'>로딩 중...</div>
      </section>
    );
  }

  return (
    <section className='flex flex-col justify-start items-start w-full gap-5 bg-base rounded-static-frame p-5'>
      <SectionHeader text='개인화 설정' size='lg' />
      {/* 전공 분야 */}
      <div className='flex flex-col justify-start items-start w-full gap-3'>
        <SectionHeader text={PERSONALIZATION_TEXT.sections.major.title} peak={false} size='sm' />
        <div className='flex flex-wrap justify-start items-start w-full gap-2'>
          {PERSONALIZATION_TEXT.sections.major.options.map((option, index) => {
            const selectedMajorIndex = getSelectedMajorIndex();
            return (
              <SelectionChip
                key={option}
                label={option}
                size='md'
                style='surface'
                selected={selectedMajorIndex === index}
                isShowChevron={false}
                onClick={() => handleMajorChange(index)}
              />
            );
          })}
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
              selected={selectedInterests.includes(index)}
              isShowChevron={false}
              onClick={() => toggleInterest(index)}
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
              selected={index === getLevelIndex(selectedLevel)}
              isShowChevron={false}
              onClick={() => handleLevelChange(index)}
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
          />

          <Button
            size='lg'
            style='surface'
            peak={true}
            label={PERSONALIZATION_TEXT.sections.keyword.saveButtonLabel}
            className='w-full xl:w-auto'
            onClick={handleSave}
            disabled={updatePersonalizationMutation.isPending}
          />
        </div>
      </div>
    </section>
  );
};
