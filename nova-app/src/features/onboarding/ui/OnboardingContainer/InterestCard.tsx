'use client';

import { ToggleButton } from '@/shared/ui';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { INTEREST_OPTIONS } from '@/features/onboarding/data/InterestOptions';
import { cn } from '@/shared/utils/cn';
import { showToast } from '@/shared/utils/toast';
import { useOnboardingStore } from '@/features/onboarding/models/useOnBoardingStore';
import { useShallow } from 'zustand/shallow';

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

  const initialSelected = useMemo(() => stepData.step2 ?? [], [stepData.step2]);
  const [selected, setSelected] = useState<string[]>(initialSelected);

  useEffect(() => {
    onValidChange(selected.length > 0);
  }, [selected, onValidChange]);

  useEffect(() => {
    setStepData('step2', selected);
  }, [selected, setStepData]);

  const toggleItem = useCallback((text: string) => {
    setSelected((prev) => {
      if (prev.includes(text)) {
        return prev.filter((item) => item !== text);
      }

      if (prev.length < 2) {
        return [...prev, text];
      }

      setTimeout(() => {
        showToast.error('최대 2개까지 선택 가능합니다.');
      }, 0);

      return prev;
    });
  }, []);

  const buttons = useMemo(
    () =>
      INTEREST_OPTIONS.map((text) => (
        <ToggleButton
          key={text}
          size='md'
          text={text}
          variant='outline'
          selected={selected.includes(text)}
          onClick={() => toggleItem(text)}
          className={cn('w-full max-w-39 sm:max-w-[142.5px] h-11 sm:text-base!')}
        />
      )),
    [selected, toggleItem],
  );

  return (
    <div className='w-full h-full sm:max-w-150 sm:max-h-53 max-w-80 max-h-143.5 flex flex-wrap gap-2 sm:gap-2.5'>
      {buttons}
    </div>
  );
};
