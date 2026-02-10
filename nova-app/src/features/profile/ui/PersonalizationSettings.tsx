'use client';

import { Button, ChipInput, SectionHeader, SelectionChip, TextBadge } from '@/shared/ui';
import { PersonalizationSettingsSkeleton } from '@/features/profile/ui/skeletons';
import { PERSONALIZATION_TEXT } from '@/shared/data/PersonalizationText';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGetKeywords } from '@/shared/hooks/useGetKeywords';
import useDebounce from '@/shared/hooks/useDebounce';
import { addKeyword, sanitizeKeywords } from '@/shared/utils/keyword';
import { showToast } from '@/shared/utils/toast';
import { getInterestIdByIndex, getLevelIndex } from '@/shared/utils/personalization';
import { usePersonalization } from '@/shared/hooks/usePersonalization';
import { useUpdatePersonalization } from '@/shared/hooks/useUpdatePersonalization';
import { MemberLevel } from '@/shared/types/memberLevel';

interface PersonalizationSettingsProps {
  memberId: number | null;
}

const LEVELS = [
  MemberLevel.NOVICE,
  MemberLevel.BEGINNER,
  MemberLevel.INTERMEDIATE,
  MemberLevel.ADVANCED,
];

export const PersonalizationSettings = ({ memberId }: PersonalizationSettingsProps) => {
  const { data: personalizationData, isLoading } = usePersonalization(memberId);
  const updatePersonalizationMutation = useUpdatePersonalization();

  // 선택 상태
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<MemberLevel | null>(null);
  const [background, setBackground] = useState<string>('');

  // 키워드 상태
  const [chips, setChips] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]); // 저장용
  const debouncedChips = useDebounce(chips, 2000);
  const prevRef = useRef<string[]>([]);

  const { data } = useGetKeywords();
  const suggestions = useMemo(() => data?.map((item) => item.name) ?? [], [data]);

  useEffect(() => {
    if (personalizationData?.data) {
      const data = personalizationData.data;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedInterests(data.interests || []);
      setSelectedLevel(data.level);
      setChips(data.keywords || []);
      setKeywords(data.keywords || []);
      setBackground(data.background || '');
      prevRef.current = data.keywords || [];
    }
  }, [personalizationData]);

  useEffect(() => {
    const prev = prevRef.current;
    const addedKeyword = debouncedChips.find((chip) => !prev.includes(chip));

    if (addedKeyword && !suggestions.includes(addedKeyword)) {
      setChips(prev);
      return;
    }

    const sanitized = sanitizeKeywords(debouncedChips);

    if (sanitized.join(',') !== prev.join(',')) {
      setChips(sanitized);
      prevRef.current = sanitized;
      setKeywords(sanitized);
    }
  }, [debouncedChips, suggestions]);

  const handleAddKeyword = (keyword: string) => {
    const { newKeywords, error } = addKeyword(chips, keyword, suggestions);
    if (error) {
      showToast.error(error);
    }
    setChips(newKeywords);
    setInputValue('');
  };

  const handleSave = () => {
    if (!memberId || selectedLevel === null) return;

    updatePersonalizationMutation.mutate(
      {
        memberId,
        requestDto: {
          level: selectedLevel,
          background,
          interests: selectedInterests,
          keywords,
        },
      },
      {
        onSuccess: () => showToast.success('저장되었습니다.'),
        onError: (error: Error) =>
          showToast.error(error?.message || '개인화 설정 저장에 실패했습니다. 다시 시도해주세요.'),
      },
    );
  };

  const toggleInterest = useCallback((index: number) => {
    const id = getInterestIdByIndex(index);
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const isInterestSelected = useCallback(
    (index: number) => selectedInterests.includes(getInterestIdByIndex(index)),
    [selectedInterests],
  );

  const handleLevelChange = useCallback((index: number) => {
    setSelectedLevel(LEVELS[index]);
  }, []);

  const handleMajorChange = useCallback((index: number) => {
    setBackground(PERSONALIZATION_TEXT.sections.major.options[index]);
  }, []);

  const getSelectedMajorIndex = () =>
    PERSONALIZATION_TEXT.sections.major.options.findIndex((o) => o === background);

  if (isLoading) return <PersonalizationSettingsSkeleton />;

  return (
    <section className='flex flex-col justify-start items-start w-full gap-5 bg-base rounded-static-frame p-5'>
      <SectionHeader text='개인화 설정' size='lg' />

      {/* 전공 */}
      <div className='flex flex-col gap-3 w-full'>
        <SectionHeader text={PERSONALIZATION_TEXT.sections.major.title} peak={false} size='sm' />
        <div className='flex flex-wrap gap-2'>
          {PERSONALIZATION_TEXT.sections.major.options.map((option, index) => (
            <SelectionChip
              key={option}
              label={option}
              size='md'
              style='surface'
              selected={getSelectedMajorIndex() === index}
              isShowChevron={false}
              index={index}
              onClick={handleMajorChange}
            />
          ))}
        </div>
      </div>

      {/* 관심 분야 */}
      <div className='flex flex-col gap-3 w-full'>
        <SectionHeader
          text={PERSONALIZATION_TEXT.sections.interests.title}
          peak={false}
          size='sm'
        />
        <div className='flex flex-wrap gap-2'>
          {PERSONALIZATION_TEXT.sections.interests.options.map((option, index) => (
            <SelectionChip
              key={option}
              label={option}
              size='md'
              style='surface'
              selected={isInterestSelected(index)}
              isShowChevron={false}
              index={index}
              onClick={toggleInterest}
            />
          ))}
        </div>
      </div>

      {/* 기술 수준 */}
      <div className='flex flex-col gap-3 w-full'>
        <SectionHeader
          text={PERSONALIZATION_TEXT.sections.skillLevel.title}
          peak={false}
          size='sm'
        />
        <div className='flex flex-wrap gap-2'>
          {PERSONALIZATION_TEXT.sections.skillLevel.options.map((option, index) => (
            <SelectionChip
              key={option}
              label={option}
              size='md'
              style='surface'
              selected={index === getLevelIndex(selectedLevel)}
              isShowChevron={false}
              onClick={handleLevelChange}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* 관심 키워드 */}
      <div className='flex flex-col gap-3 w-full'>
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

        <div className='flex flex-col lg:flex-row gap-3 w-full items-center'>
          <ChipInput
            size='lg'
            variant='surface'
            value={chips}
            data={false}
            onChange={(newChips) => setChips(sanitizeKeywords(newChips))}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onAdd={handleAddKeyword}
            suggestions={suggestions}
            placeholder='키워드를 입력하세요'
            className='w-full h-11 min-w-0'
          />

          <Button
            size='lg'
            style='surface'
            peak={true}
            label={'저장'}
            className='w-full lg:w-auto'
            onClick={handleSave}
            disabled={updatePersonalizationMutation.isPending}
          />
        </div>
      </div>
    </section>
  );
};
