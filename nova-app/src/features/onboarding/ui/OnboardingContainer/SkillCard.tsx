'use client';

import { ToggleButton } from '@/shared/ui';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { cn } from '@/shared/utils/cn';
import { useOnboardingStore } from '@/features/onboarding/models/useOnBoardingStore';
import { useShallow } from 'zustand/shallow';
import { PERSONALIZATION_TEXT } from '@/shared/data/PersonalizationText';
import { getLevelIndex } from '@/shared/utils/personalization';
import { MemberLevel } from '@/shared/types/memberLevel';

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

  const initialSelected = useMemo(() => stepData.step3 ?? null, [stepData.step3]);
  const [selected, setSelected] = useState<MemberLevel | null>(initialSelected);

  useEffect(() => {
    onValidChange(!!selected);
  }, [selected, onValidChange]);

  useEffect(() => {
    setStepData('step3', selected);
  }, [selected, setStepData]);

  const toggleItem = useCallback((text: MemberLevel) => {
    setSelected((prev) => (prev === text ? null : text));
  }, []);

  const handleLevelChange = (index: number) => {
    const levels = [
      MemberLevel.NOVICE,
      MemberLevel.BEGINNER,
      MemberLevel.INTERMEDIATE,
      MemberLevel.ADVANCED,
    ];
    setSelected(levels[index]);
  };

  const buttons = useMemo(() => {
    return PERSONALIZATION_TEXT.sections.skillLevel.options.map((option, index) => {
      return (
        <ToggleButton
          size='lg'
          key={option}
          text={option}
          variant='outline'
          selected={index === getLevelIndex(selected)}
          onClick={() => handleLevelChange(index)}
          className={cn('w-full max-w-38.5 sm:max-w-73.5 max-h-10 sm:h-11')}
        />
      );
    });
  }, [selected]);

  return <div className='sm:w-150 sm:h-24.5 flex flex-wrap gap-2.5 h-22.5'>{buttons}</div>;
};
