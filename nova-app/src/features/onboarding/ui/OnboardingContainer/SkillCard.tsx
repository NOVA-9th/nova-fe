'use client';

import { ToggleButton } from '@/shared/ui';
import { useEffect, useState, useMemo } from 'react';
import { cn } from '@/shared/utils/cn';
import { useOnboardingStore } from '@/features/onboarding/models/useOnBoardingStore';
import { useShallow } from 'zustand/shallow';
import { PERSONALIZATION_TEXT } from '@/shared/data/PersonalizationText';
import { MemberLevel } from '@/shared/types/memberLevel';

interface SkillCardProps {
  onValidChange: (isValid: boolean) => void;
}

const SKILL_LEVELS: MemberLevel[] = [
  MemberLevel.NOVICE,
  MemberLevel.BEGINNER,
  MemberLevel.INTERMEDIATE,
  MemberLevel.ADVANCED,
];

export const SkillCard = ({ onValidChange }: SkillCardProps) => {
  const { stepData, setStepData } = useOnboardingStore(
    useShallow((state) => ({
      stepData: state.stepData,
      setStepData: state.setStepData,
    })),
  );

  const initialSelected = useMemo(() => stepData.step3 ?? null, [stepData.step3]);
  const [selected, setSelected] = useState<MemberLevel | null>(initialSelected);

  // 유효성 체크
  useEffect(() => {
    onValidChange(!!selected);
  }, [selected, onValidChange]);

  // store 업데이트
  useEffect(() => {
    setStepData('step3', selected);
  }, [selected, setStepData]);

  // 버튼 렌더링
  const buttons = useMemo(() => {
    return PERSONALIZATION_TEXT.sections.skillLevel.options.map((option, index) => {
      const level = SKILL_LEVELS[index];
      return (
        <ToggleButton
          key={option}
          size='lg'
          text={option}
          variant='outline'
          value={level.toString()}
          selected={level === selected}
          onClick={(valueStr) => {
            const selectedLevel = SKILL_LEVELS.find((l) => l.toString() === valueStr) ?? null;
            setSelected(selectedLevel);
          }}
          className={cn('w-full max-w-38.5 sm:max-w-73.5 max-h-10 sm:h-11')}
        />
      );
    });
  }, [selected]);

  return <div className='sm:w-150 sm:h-24.5 flex flex-wrap gap-2.5 h-22.5'>{buttons}</div>;
};
