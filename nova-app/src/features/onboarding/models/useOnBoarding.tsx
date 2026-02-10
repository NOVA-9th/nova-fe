import { useState, useCallback } from 'react';
import { STEP_ITEMS } from '@/features/onboarding/data/StepItems';
import { Step } from '@/features/onboarding/types/StepItem';

const STEPS = ['step1', 'step2', 'step3', 'step4'] as const;

export const useOnboarding = () => {
  const [currentStep, setCurrentStep] = useState<Step>('step1');
  const [stepValidMap, setStepValidMap] = useState<Record<Step, boolean>>({
    step1: false,
    step2: false,
    step3: false,
    step4: true,
  });

  const isFirstStep = currentStep === STEPS[0];
  const isLastStep = currentStep === STEPS[STEPS.length - 1];
  const isStepValid = stepValidMap[currentStep];
  const showSkip = currentStep === 'step2' || currentStep === 'step4';

  const onNext = useCallback(() => {
    setCurrentStep((prev) => STEPS[Math.min(STEPS.indexOf(prev) + 1, STEPS.length - 1)]);
  }, []);

  const onPrev = useCallback(() => {
    setCurrentStep((prev) => STEPS[Math.max(STEPS.indexOf(prev) - 1, 0)]);
  }, []);

  const onValidChange = useCallback(
    (isValid: boolean) => {
      setStepValidMap((prev) => {
        if (prev[currentStep] === isValid) return prev;
        return { ...prev, [currentStep]: isValid };
      });
    },
    [currentStep],
  );

  return {
    currentStep,
    currentItem: STEP_ITEMS[currentStep],
    isFirstStep,
    isLastStep,
    isStepValid,
    showSkip,
    onNext,
    onPrev,
    onValidChange,
  };
};
