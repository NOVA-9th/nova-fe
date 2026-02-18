import clsx from 'clsx';
import { Step } from '@/features/onboarding/types/StepItem';
import { memo } from 'react';

export type StepStatus = 'default' | 'success' | 'error';

interface StepperProps {
  currentStep: Step;
  labels: string[];
  /** 각 스텝별 결과 (퀴즈 등: 정답=success, 오답=error, 미응답=default) */
  stepStatus?: StepStatus[];
  /** 현재 스텝 정답/오답이 공개되었을 때 true → 다음 스텝의 왼쪽 막대를 채움 */
  currentStepRevealed?: boolean;
}

export const Stepper = memo(
  ({ currentStep, labels, stepStatus, currentStepRevealed }: StepperProps) => {
  const STEP_ORDER: Step[] = ['step1', 'step2', 'step3', 'step4'];
  const currentIndex = STEP_ORDER.indexOf(currentStep) + 1;
  const statuses = stepStatus ?? STEP_ORDER.map(() => 'default' as StepStatus);

  return (
    <div className='flex items-center w-full'>
      {STEP_ORDER.map((_, index) => {
        const step = index + 1;
        const isActive = step <= currentIndex;
        const status = statuses[index] ?? 'default';
        const label = labels[index] ?? `Step ${step}`;

        const prevStatus = index > 0 ? statuses[index - 1] : null;
        const lineColor = (s: StepStatus) =>
          s === 'success' ? 'bg-green-500' : s === 'error' ? 'bg-red-500' : 'bg-surface';
        const leftLineBg =
          step === 1 ? 'bg-transparent' : prevStatus !== null ? lineColor(prevStatus) : 'bg-surface';
        const rightLineBg =
          step === STEP_ORDER.length
            ? 'bg-transparent'
            : step === currentIndex
              ? status !== 'default'
                ? lineColor(status)
                : 'bg-peak'
              : step < currentIndex
                ? lineColor(status)
                : 'bg-surface';
        const circleBg =
          status === 'success'
            ? 'bg-green-500 text-white'
            : status === 'error'
              ? 'bg-red-500 text-white'
              : isActive
                ? 'bg-peak text-peak'
                : 'bg-surface text-login';

        const leftFilled =
          step > 1 &&
          (currentIndex >= step || (step === currentIndex + 1 && !!currentStepRevealed));
        /** 정답 공개로 채워지는 경우 → 왼쪽→오른쪽 애니메이션 적용 */
        const leftFilledByReveal =
          step > 1 && step === currentIndex + 1 && !!currentStepRevealed;
        const rightFilled = step < STEP_ORDER.length && currentIndex >= step;
        const leftFillColor =
          step === 1 || leftLineBg === 'bg-surface' || leftLineBg === 'bg-transparent'
            ? null
            : leftLineBg;
        const rightFillColor =
          step === STEP_ORDER.length ||
          rightLineBg === 'bg-surface' ||
          rightLineBg === 'bg-transparent'
            ? null
            : rightLineBg;

        return (
          <div key={step} className='flex flex-col items-center justify-center flex-1'>
            <div className='flex items-center w-full'>
              {/* 왼쪽 작대기: 채워지는 애니메이션 */}
              <div
                className={clsx(
                  'relative flex-1 h-0.75 mr-2 rounded-r-static-pill overflow-hidden',
                  step === 1 ? 'bg-transparent' : 'bg-surface',
                )}
              >
                {leftFillColor && (
                  <div
                    key={leftFilledByReveal ? 'revealed' : leftFilled ? 'filled' : 'empty'}
                    className={clsx(
                      'absolute inset-0 rounded-r-static-pill origin-left',
                      leftFillColor,
                      leftFilledByReveal
                        ? 'animate-stepper-fill'
                        : leftFilled
                          ? 'scale-x-100'
                          : 'scale-x-0',
                    )}
                  />
                )}
              </div>
              <div
                className={clsx(
                  'flex items-center justify-center w-6 h-6 rounded-static-pill typo-body-key',
                  circleBg,
                  step === currentIndex && step > 1 && 'animate-stepper-circle-immediate',
                )}
              >
                {step}
              </div>
              {/* 오른쪽 작대기: 채워지는 애니메이션 */}
              <div
                className={clsx(
                  'relative flex-1 ml-2 h-0.75 rounded-l-static-pill overflow-hidden',
                  step === STEP_ORDER.length ? 'bg-transparent' : 'bg-surface',
                )}
              >
                {rightFillColor && (
                  <div
                    key={rightFilled ? 'filled' : 'empty'}
                    className={clsx(
                      'absolute inset-0 rounded-l-static-pill origin-left',
                      rightFillColor,
                      rightFilled
                        ? step === currentIndex
                          ? 'animate-stepper-fill'
                          : 'scale-x-100'
                        : 'scale-x-0',
                    )}
                  />
                )}
              </div>
            </div>
            <span
              className={clsx(
                'typo-body-key mt-2 whitespace-nowrap',
                isActive ? 'text-base-color' : 'text-additive',
              )}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
  }
);
