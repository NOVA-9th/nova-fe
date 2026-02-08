'use client';

import { SearchInput } from '@/features/onboarding/ui';
import { useEffect, useMemo, useState } from 'react';
import { useOnboardingStore } from '../../models/useOnBoardingStore';
import { useShallow } from 'zustand/shallow';

interface InterestKeywordCardProps {
  onValidChange: (isValid: boolean) => void;
}

export const InterestKeywordCard = ({ onValidChange }: InterestKeywordCardProps) => {
  const { stepData, setStepData } = useOnboardingStore(
    useShallow((state) => ({
      stepData: state.stepData,
      setStepData: state.setStepData,
    })),
  );

  const initialSelected = useMemo(() => stepData.step4 ?? [], [stepData.step4]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(initialSelected);

  useEffect(() => {
    setStepData('step4', selectedKeywords);
    onValidChange(selectedKeywords.length > 0);
  }, [selectedKeywords, setStepData, onValidChange]);

  return (
    <SearchInput
      selectedKeywords={selectedKeywords}
      onChangeKeywords={setSelectedKeywords}
      className='sm:h-24.5 h-22.5'
    />
  );
};
