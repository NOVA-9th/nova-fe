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
    <main className='flex flex-col w-full max-w-90 gap-5 p-5 bg-base rounded-static-frame sm:max-w-160'>
      <Stepper
        currentStep={currentStep}
        labels={['전공 분야', '관심 분야', '기술 역량', '관심 키워드']}
      />

      <div>
        <Header size='lg' label={label} />
        <span className='px-1 typo-body-base text-additive hidden sm:block'>{description}</span>
        <span className='px-1 typo-callout-base text-additive block sm:hidden'>{description}</span>
      </div>
      <Component onValidChange={onValidChange} />

      <div className='mt-auto flex w-full max-w-80 sm:max-w-150 justify-between'>
        {!isFirstStep ? (
          <Button
            size='lg'
            label='이전'
            style='surface'
            onClick={onPrev}
            className='w-full sm:max-w-15 max-w-14 typo-callout-key'
          />
        ) : (
          <div />
        )}

        <div className='flex gap-2'>
          {showSkip && (
            <Button
              size='lg'
              label='건너뛰기'
              style='data'
              peak={false}
              onClick={handleSkip}
              className='w-full sm:max-w-21.75 max-w-20 typo-callout-key'
            />
          )}

          <Button
            size='lg'
            label={currentStep === 'step4' ? '완료' : '다음'}
            style={currentStep === 'step4' ? 'accent' : 'surface'}
            onClick={handleNext}
            peak={isStepValid}
            disabled={!isStepValid}
            className='w-full sm:max-w-15 max-w-14 typo-callout-key'
          />
        </div>
      </div>
    </main>
  );
};
