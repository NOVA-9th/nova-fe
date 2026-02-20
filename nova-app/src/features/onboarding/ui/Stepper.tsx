import clsx from 'clsx';
import { Step } from '@/features/onboarding/types/StepItem';
import { memo } from 'react';

export type StepStatus = 'default' | 'success' | 'error';

interface StepperProps {
  currentStep: Step;
  labels: string[];
}

export const Stepper = memo(({ currentStep, labels }: StepperProps) => {
  const STEP_ORDER: Step[] = ['step1', 'step2', 'step3', 'step4'];
  const currentIndex = STEP_ORDER.indexOf(currentStep) + 1;

  return (
    <div className='flex items-center w-full'>
      {STEP_ORDER.map((_, index) => {
        const step = index + 1;
        const isActive = step <= currentIndex;
        const label = labels[index] ?? `Step ${step}`;

        return (
          <div key={step} className='flex flex-col items-center justify-center flex-1'>
            <div className='flex items-center w-full'>
              {/* 왼쪽 선 */}
              <div
                className={clsx(
                  'flex-1 h-0.75 mr-2 rounded-r-static-pill',
                  step === 1 ? 'bg-transparent' : step <= currentIndex ? 'bg-peak' : 'bg-surface',
                )}
              />

              <div
                className={clsx(
                  'flex items-center justify-center w-6 h-6 rounded-static-pill typo-body-key',
                  isActive ? 'bg-peak text-peak' : 'bg-surface text-login',
                )}
              >
                {step}
              </div>

              {/* 오른쪽 선 */}
              <div
                className={clsx(
                  'flex-1 ml-2 h-0.75 rounded-l-static-pill',
                  step === STEP_ORDER.length
                    ? 'bg-transparent'
                    : step < currentIndex
                      ? 'bg-peak'
                      : 'bg-surface',
                )}
              />
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
});