'use client';

import { useOnboarding } from '@/features/onboarding/models/useOnBoarding';
import { Stepper } from '@/features/onboarding/ui';
import { Button, Header } from '@/shared/ui';
import { useRouter } from 'next/navigation';

export const OnboardingContainer = () => {
  const {
    currentStep,
    currentItem,
    isFirstStep,
    isStepValid,
    showSkip,
    onNext,
    onPrev,
    onValidChange,
  } = useOnboarding();

  const router = useRouter();
  const { label, description, Component } = currentItem;

  const handleNext = () => {
    if (currentStep === 'step4') {
      router.replace('/');
      return;
    }
    onNext();
  };

  const handleSkip = () => {
    if (currentStep === 'step4') {
      router.replace('/');
      return;
    }
    onNext();
  };

  return (
    <main className='flex flex-col w-160 min-h-94 max-h-123.5 gap-5 p-5 bg-base rounded-static-frame'>
      <Stepper
        currentStep={currentStep}
        labels={['전공 분야', '관심 분야', '기술 역량', '관심 키워드']}
      />

      <Header size='lg' label={label} description={description} />
      <Component onValidChange={onValidChange} />

      <div className='flex w-150 h-11 justify-between'>
        {!isFirstStep ? (
          <Button size='lg' label='이전' style='surface' onClick={onPrev} className='w-15' />
        ) : (
          <div />
        )}

        <div className='flex gap-2'>
          {showSkip && (
            <Button
              size='lg'
              label='건너뛰기'
              style='data'
              onClick={handleSkip}
              className='w-21.75'
            />
          )}

          <Button
            size='lg'
            label={currentStep === 'step4' ? '완료' : '다음'}
            style={currentStep === 'step4' ? 'accent' : 'surface'}
            onClick={handleNext}
            peak={isStepValid}
            disabled={!isStepValid}
            className='w-15 h-11'
          />
        </div>
      </div>
    </main>
  );
};
