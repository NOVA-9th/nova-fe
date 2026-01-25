import clsx from 'clsx';

interface StepperProps {
  currentStep: number;
  labels: string[];
}

const Stepper = ({ currentStep, labels }: StepperProps) => {
  return (
    <div className='flex items-center'>
      {Array.from({ length: 4 }).map((_, index) => {
        const step = index + 1;
        const isActive = step <= currentStep;
        const label = labels[index] ?? `Step ${step}`;

        return (
          <div key={step} className='flex flex-col items-center justify-center'>
            <div className='flex items-center'>
              {/* 왼쪽 선 */}
              <div
                className={clsx(
                  'h-0.75 w-13.75 mr-2 rounded-r-static-pill',
                  step === 1
                    ? 'bg-transparent'
                    : step <= currentStep
                      ? 'bg-charcoal-full'
                      : 'bg-slate-outline',
                )}
              />

              <div className='flex flex-col items-center gap-1'>
                <div
                  className={clsx(
                    'flex items-center justify-center w-6 h-6 rounded-static-pill typo-body-key',
                    isActive ? 'bg-peak text-peak' : 'bg-surface text-charcoal-additive',
                  )}
                >
                  {step}
                </div>
              </div>

              <div
                className={clsx(
                  'ml-2 h-0.75 w-13.75 rounded-l-static-pill',
                  step === 4
                    ? 'bg-transparent'
                    : step < currentStep
                      ? 'bg-charcoal-full'
                      : 'bg-slate-outline',
                )}
              />
            </div>

            <span
              className={clsx(
                'typo-body-key mt-2 whitespace-nowrap',
                isActive ? 'text-charcoal-full' : 'text-charcoal-additive',
              )}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
