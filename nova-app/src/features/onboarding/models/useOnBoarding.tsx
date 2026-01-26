import { useState } from 'react';
import { STEP_ITEMS } from '../data/StepItems';
import { Step } from '../types/StepItem';

const STEPS = [1, 2, 3, 4] as const;

export const useOnboarding = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [stepValidMap, setStepValidMap] = useState<Record<Step, boolean>>({
    1: false,
    2: false,
    3: false,
    4: true,
  });

  const isFirstStep = currentStep === STEPS[0];
  const isLastStep = currentStep === STEPS[STEPS.length - 1];
  const isStepValid = stepValidMap[currentStep];
  const showSkip = currentStep === 2 || currentStep === 4;

  const onNext = () =>
    setCurrentStep((prev) => STEPS[Math.min(STEPS.indexOf(prev) + 1, STEPS.length - 1)]);
  const onPrev = () => setCurrentStep((prev) => STEPS[Math.max(STEPS.indexOf(prev) - 1, 0)]);

  const onValidChange = (isValid: boolean) => {
    setStepValidMap((prev) => {
      if (prev[currentStep] === isValid) return prev;
      return { ...prev, [currentStep]: isValid };
    });
  };

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
