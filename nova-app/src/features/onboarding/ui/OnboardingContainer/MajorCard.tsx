'use client';

import { ToggleButton } from '@/shared/ui';
import { useEffect, useState, useMemo } from 'react';
import { cn } from '@/shared/utils/cn';
import { useOnboardingStore } from '@/features/onboarding/models/useOnBoardingStore';
import { useShallow } from 'zustand/shallow';
import { PERSONALIZATION_TEXT } from '@/shared/data/PersonalizationText';

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

  const initialSelected = useMemo(() => stepData.step1 ?? null, [stepData.step1]);
  const [selected, setSelected] = useState<string | null>(initialSelected);

  useEffect(() => {
    setStepData('step1', selected);
    onValidChange(!!selected);
  }, [selected, setStepData, onValidChange]);

  const buttons = useMemo(
    () =>
      PERSONALIZATION_TEXT.sections.major.options.map((text) => (
        <ToggleButton
          key={text}
          size='md'
          text={text}
          variant='outline'
          selected={selected === text}
          value={text}
          onClick={setSelected}
          className={cn('w-full max-w-39 sm:max-w-[142.5px] h-11 sm:text-base!')}
        />
      )),
    [selected],
  );

  return (
    <div className='w-full h-full sm:max-w-150 max-w-80 flex flex-wrap gap-2 sm:gap-2.5'>
      {buttons}
    </div>
  );
};
