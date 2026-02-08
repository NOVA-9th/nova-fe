'use client';

import { Button, ChipInput, SectionHeader, SelectionChip, TextBadge } from '@/shared/ui';
import { PersonalizationSettingsSkeleton } from './skeletons';
import { usePersonalization, useUpdatePersonalization } from '../hooks/useProfile';
import { MemberLevel } from '../api/types';
import { PERSONALIZATION_TEXT } from '../data/PersonalizationText';
import { useEffect, useMemo, useState } from 'react';
import { showToast } from '@/shared/utils/toast';
import { useGetKeywords } from '@/shared/hooks/useGetKeywords';

interface PersonalizationSettingsProps {
  memberId: number | null;
}

export const PersonalizationSettings = ({ memberId }: PersonalizationSettingsProps) => {
  const { data: personalizationData, isLoading } = usePersonalization(memberId);
  const updatePersonalizationMutation = useUpdatePersonalization();
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<MemberLevel | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [background, setBackground] = useState<string>('');

  const { data } = useGetKeywords();
  const suggestions = useMemo(() => data?.map((item) => item.name) ?? [], [data]);

  const [inputValue, setInputValue] = useState('');

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

  const handleAddKeyword = (keyword: string) => {
    if (keywords.length >= 5) {
      showToast.error('키워드는 최대 5개까지 선택할 수 있어요.');
      return;
    }

    if (keywords.includes(keyword)) return;
    setKeywords((prev) => [...prev, keyword]);
  };

  const handleSave = () => {
    if (!memberId || selectedLevel === null) return;

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
          showToast.success('저장되었습니다.');
        },
        onError: (error: Error) => {
          showToast.error(error?.message || '개인화 설정 저장에 실패했습니다. 다시 시도해주세요.');
        },
      },
    );
  };

  // 인덱스를 ID로 변환
  const getInterestIdByIndex = (index: number): number => {
    return PERSONALIZATION_TEXT.sections.interests.ids[index];
  };

  const toggleInterest = (index: number) => {
    const interestId = getInterestIdByIndex(index);
    setSelectedInterests((prev) =>
      prev.includes(interestId) ? prev.filter((id) => id !== interestId) : [...prev, interestId],
    );
  };

  // 인덱스에 해당하는 관심 분야가 선택되었는지 확인
  const isInterestSelected = (index: number): boolean => {
    const interestId = getInterestIdByIndex(index);
    return selectedInterests.includes(interestId);
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
      (option) => option === background,
    );
    return index !== -1 ? index : null;
  };

  if (isLoading) {
    return <PersonalizationSettingsSkeleton />;
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
              selected={isInterestSelected(index)}
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
            onClick={handleSave}
            disabled={updatePersonalizationMutation.isPending}
          />
        </div>
      </div>
    </section>
  );
};
