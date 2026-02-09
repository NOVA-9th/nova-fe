'use client';

import { ToggleButton } from '@/shared/ui';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { PERSONALIZATION_TEXT } from '@/shared/data/PersonalizationText';
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

  const initialSelectedOptions = useMemo(() => {
    if (!stepData.step2) return [];
    return stepData.step2
      .map((id) => {
        const index = PERSONALIZATION_TEXT.sections.interests.ids.indexOf(id);
        return PERSONALIZATION_TEXT.sections.interests.options[index];
      })
      .filter(Boolean) as string[];
  }, [stepData.step2]);

  const [selectedOptions, setSelectedOptions] = useState<string[]>(initialSelectedOptions);

  useEffect(() => {
    onValidChange(selectedOptions.length > 0);
  }, [selectedOptions, onValidChange]);

  useEffect(() => {
    const ids = selectedOptions.map((option) => {
      const opt = option as (typeof PERSONALIZATION_TEXT.sections.interests.options)[number];
      const index = PERSONALIZATION_TEXT.sections.interests.options.indexOf(opt);
      return getInterestIdByIndex(index);
    });

    setStepData('step2', ids);
  }, [selectedOptions, setStepData]);

  const toggleItem = useCallback((option: string) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option)) return prev.filter((o) => o !== option);
      if (prev.length < 2) return [...prev, option];
      setTimeout(() => showToast.error('최대 2개까지 선택 가능합니다.'), 0);
      return prev;
    });
  }, []);

  const buttons = useMemo(() => {
    return PERSONALIZATION_TEXT.sections.interests.options.map((option) => (
      <ToggleButton
        key={option}
        size='md'
        text={option}
        variant='outline'
        selected={selectedOptions.includes(option)}
        value={option}
        onClick={toggleItem}
        className={cn('w-full max-w-39 sm:max-w-[142.5px] h-11 sm:text-base!')}
      />
    ));
  }, [selectedOptions, toggleItem]);

  return (
    <div className='w-full h-full sm:max-w-150 sm:max-h-53 max-w-80 max-h-143.5 flex flex-wrap gap-2 sm:gap-2.5'>
      {buttons}
    </div>
  );
};
