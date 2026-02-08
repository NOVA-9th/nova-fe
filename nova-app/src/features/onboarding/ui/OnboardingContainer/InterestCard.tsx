'use client';

import { ToggleButton } from '@/shared/ui';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { PERSONALIZATION_TEXT } from '@/features/profile/data/PersonalizationText';
import { cn } from '@/shared/utils/cn';
import { showToast } from '@/shared/utils/toast';
import { useOnboardingStore } from '@/features/onboarding/models/useOnBoardingStore';
import { useShallow } from 'zustand/shallow';
import { getInterestIdByIndex } from '@/shared/utils/personalization';

interface InterestCardProps {
  onValidChange: (isValid: boolean) => void;
}

export const InterestCard = ({ onValidChange }: InterestCardProps) => {
  const { stepData, setStepData } = useOnboardingStore(
    useShallow((state) => ({
      stepData: state.stepData,
      setStepData: state.setStepData,
    })),
  );

  const initialSelectedIds = useMemo(() => stepData.step2 ?? [], [stepData.step2]);
  const [selectedIds, setSelectedIds] = useState<number[]>(initialSelectedIds);

  // 유효성 체크
  useEffect(() => {
    onValidChange(selectedIds.length > 0);
  }, [selectedIds, onValidChange]);

  useEffect(() => {
    setStepData('step2', selectedIds);
  }, [selectedIds, setStepData]);

  const toggleItem = useCallback((index: number) => {
    const id = getInterestIdByIndex(index);

    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      if (prev.length < 2) {
        return [...prev, id];
      }

      setTimeout(() => {
        showToast.error('최대 2개까지 선택 가능합니다.');
      }, 0);

      return prev;
    });
  }, []);

  const buttons = useMemo(() => {
    return PERSONALIZATION_TEXT.sections.interests.options.map((option, index) => {
      const id = getInterestIdByIndex(index); // 백엔드 ID
      return (
        <ToggleButton
          key={option}
          size='md'
          text={option}
          variant='outline'
          selected={selectedIds.includes(id)} // <- 여기 수정
          onClick={() => toggleItem(index)}
          className={cn('w-full max-w-39 sm:max-w-[142.5px] h-11 sm:text-base!')}
        />
      );
    });
  }, [selectedIds, toggleItem]);

  return (
    <div className='w-full h-full sm:max-w-150 sm:max-h-53 max-w-80 max-h-143.5 flex flex-wrap gap-2 sm:gap-2.5'>
      {buttons}
    </div>
  );
};
