'use client';

import { useState } from 'react';

import Stepper from '@/features/onboarding/ui/Stepper';
import { Header } from '@/shared/ui';
import { STEP_ITEMS } from '@/features/onboarding/data/StepItems';
import StepCard from '@/features/onboarding/ui/StepCard';

const STEPS = [1, 2, 3, 4] as const;
type Step = (typeof STEPS)[number];

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);

  const currentItem = STEP_ITEMS[currentStep];
  const StepComponent = currentItem.Component;

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='flex flex-col w-160 bg-base rounded-static-frame min-h-94 max-h-123.5 gap-5 p-5'>
        <Stepper
          currentStep={currentStep}
          labels={['전공 분야', '관심 분야', '기술 역량', '관심 키워드']}
        />

        <Header size='lg' label={currentItem.label} description={currentItem.description} />
        <StepCard></StepCard>
      </div>
    </div>
  );
};

export default OnboardingPage;
