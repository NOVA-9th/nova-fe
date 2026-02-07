'use client';

import { ToggleButton } from '@/shared/ui';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { MAJOR_OPTIONS } from '@/features/onboarding/data/MajorOptions';
import { cn } from '@/shared/utils/cn';
import { useOnboardingStore } from '@/features/onboarding/models/useOnBoardingStore';
import { useShallow } from 'zustand/shallow';

interface MajorCardProps {
  onValidChange: (isValid: boolean) => void;
}

export const MajorCard = ({ onValidChange }: MajorCardProps) => {
  const { stepData, setStepData } = useOnboardingStore(
    useShallow((state) => ({
      stepData: state.stepData,
      setStepData: state.setStepData,
    })),
  );

  const initialSelected = useMemo(() => stepData.step1?.[0] ?? null, [stepData.step1]);
  const [selected, setSelected] = useState<string | null>(initialSelected);

  useEffect(() => {
    onValidChange(!!selected);
  }, [selected, onValidChange]);

  useEffect(() => {
    setStepData('step1', selected ? [selected] : []);
  }, [selected, setStepData]);

  const toggleItem = useCallback((text: string) => {
    setSelected((prev) => (prev === text ? null : text));
  }, []);

  const buttons = useMemo(
    () =>
      MAJOR_OPTIONS.map((text) => (
        <ToggleButton
          key={text}
          size='md'
          text={text}
          variant='outline'
          selected={selected === text}
          onClick={() => toggleItem(text)}
          className={cn('w-full max-w-39 sm:max-w-[142.5px] h-11 sm:text-base!')}
        />
      )),
    [selected, toggleItem],
  );

  return (
    <div className='w-full h-full sm:max-w-150 max-w-80 flex flex-wrap gap-2 sm:gap-2.5'>
      {buttons}
    </div>
  );
};
