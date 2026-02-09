'use client';

import { useOnboarding } from '@/features/onboarding/models/useOnBoarding';
import { Stepper } from '@/features/onboarding/ui';
import { Button, Header } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { useOnboardingStore } from '@/features/onboarding/models/useOnBoardingStore';
import { useAuthStore } from '@/features/login/model/useAuthStore';
import { showToast } from '@/shared/utils/toast';
import { useUpdatePersonalization } from '@/shared/hooks/useUpdatePersonalization';

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

  const memberId = useAuthStore((state) => state.memberId);
  const updatePersonalizationMutation = useUpdatePersonalization();

  const showHeader = true;

  const handleStepChange = useCallback(
    (value: any) => {
      onValidChange(!!value && (Array.isArray(value) ? value.length > 0 : true));
    },
    [onValidChange],
  );
  const handleSave = useCallback(() => {
    if (!memberId) return;

    const stepData = useOnboardingStore.getState().stepData;

    updatePersonalizationMutation.mutate(
      {
        memberId,
        requestDto: {
          level: stepData.step3 ?? null,
          background: stepData.step1 ?? null,
          interests: stepData.step2 ?? [],
          keywords: stepData.step4 ?? [],
        },
      },
      {
        onSuccess: () => {
          showToast.success('저장되었습니다.');
          router.replace('/');
        },
        onError: (error: Error) => {
          showToast.error(error?.message || '개인화 설정 저장에 실패했습니다. 다시 시도해주세요.');
        },
      },
    );
  }, [memberId, updatePersonalizationMutation, router]);

  const handleNext = useCallback(() => {
    if (currentStep === 'step4') {
      handleSave();
      return;
    }
    onNext();
  }, [currentStep, onNext, router, handleSave]);

  const handleSkip = useCallback(() => {
    if (currentStep === 'step2') {
      useOnboardingStore.setState((state) => ({
        stepData: {
          ...state.stepData,
          step2: [],
        },
      }));
      onNext();
      return;
    }

    if (currentStep === 'step4') {
      if (!memberId) return;

      const { step1, step2, step3 } = useOnboardingStore.getState().stepData;

      updatePersonalizationMutation.mutate(
        {
          memberId,
          requestDto: {
            level: step3 ?? null,
            background: step1 ?? null,
            interests: step2 ?? [],
            keywords: [],
          },
        },
        {
          onSuccess: () => router.replace('/'),
          onError: (error: Error) =>
            showToast.error(
              error?.message || '개인화 설정 저장에 실패했습니다. 다시 시도해주세요.',
            ),
        },
      );
      return;
    }

    onNext();
  }, [currentStep, memberId, updatePersonalizationMutation, router, onNext]);

  const headerMemo = useMemo(() => {
    if (!showHeader) return null;
    return (
      <>
        <Header size='lg' label={label} description={description} className='hidden sm:flex' />
        <Header size='md' label={label} className='flex sm:hidden' />
        <span className='px-1 typo-callout-base text-additive block sm:hidden'>{description}</span>
      </>
    );
  }, [label, description, showHeader]);

  return (
    <main className='flex flex-col w-full max-w-90 gap-5 px-7 py-5 bg-base rounded-static-frame sm:max-w-170 sm:px-10 sm:py-7.5'>
      <Stepper
        currentStep={currentStep}
        labels={['전공 분야', '관심 분야', '기술 역량', '관심 키워드']}
      />

      <div>{headerMemo}</div>

      <Component onValidChange={handleStepChange} />

      <div className='mt-auto flex w-full max-w-80 sm:max-w-150 justify-between'>
        {!isFirstStep ? (
          <Button
            size='lg'
            label='이전'
            style='surface'
            onClick={onPrev}
            className='w-14 sm:w-15 typo-callout-key sm:typo-body-key'
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
              className='sm:w-21.75 w-20 typo-callout-key sm:typo-body-key'
            />
          )}

          <Button
            size='lg'
            label={currentStep === 'step4' ? '완료' : '다음'}
            style={currentStep === 'step4' ? 'accent' : 'surface'}
            onClick={handleNext}
            peak={isStepValid}
            disabled={!isStepValid}
            className='w-14 sm:w-15 sm:max-w-15 max-w-14 typo-callout-key sm:typo-body-key'
          />
        </div>
      </div>
    </main>
  );
};
