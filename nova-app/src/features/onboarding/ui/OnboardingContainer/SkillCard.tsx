'use client';

import { ToggleButton } from '@/shared/ui';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { SKILL_OPTIONS } from '@/features/onboarding/data/SkillOptions';
import { cn } from '@/shared/utils/cn';
import { useOnboardingStore } from '@/features/onboarding/models/useOnBoardingStore';
import { useShallow } from 'zustand/shallow';

interface SkillCardProps {
  onValidChange: (isValid: boolean) => void;
}

export const SkillCard = ({ onValidChange }: SkillCardProps) => {
  const { stepData, setStepData } = useOnboardingStore(
    useShallow((state) => ({
      stepData: state.stepData,
      setStepData: state.setStepData,
    })),
  );

  const initialSelected = useMemo(() => stepData.step3?.[0] ?? null, [stepData.step3]);
  const [selected, setSelected] = useState<string | null>(initialSelected);

  useEffect(() => {
    onValidChange(!!selected);
  }, [selected, onValidChange]);

  useEffect(() => {
    setStepData('step3', selected ? [selected] : []);
  }, [selected, setStepData]);

  const toggleItem = useCallback((text: string) => {
    setSelected((prev) => (prev === text ? null : text));
  }, []);

  const buttons = useMemo(
    () =>
      SKILL_OPTIONS.map((text) => (
        <ToggleButton
          size='lg'
          key={text}
          text={text}
          variant='outline'
          selected={selected === text}
          onClick={() => toggleItem(text)}
          className={cn('w-full max-w-38.5 sm:max-w-73.5 max-h-10 sm:h-11')}
        />
      )),
    [selected, toggleItem],
  );

  return <div className='sm:w-150 sm:h-24.5 flex flex-wrap gap-2.5 h-22.5'>{buttons}</div>;
};
