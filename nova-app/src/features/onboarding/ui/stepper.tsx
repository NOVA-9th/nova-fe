import { cn } from '@/shared/utils/cn';

interface StepperProps {
  totalSteps: number;
  currentStep: number;
  labels: string[];
}

export default function Stepper({ totalSteps, currentStep, labels }: StepperProps) {
  return (
    <div className='flex items-center'>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const isActive = step <= currentStep;
        const label = labels[index] ?? `Step ${step}`;

        return (
          <div className='flex flex-col items-center justify-center'>
            <div key={step} className='flex items-center'>
              <div
                className={cn(`h-0.75 w-13.75 mr-2 rounded-r-static-pill
                ${step === 1 ? 'bg-transparent' : step <= currentStep ? 'bg-charcoal-full' : ' bg-slate-outline'}`)}
              />
              <div className='flex flex-col items-center gap-1'>
                <div
                  className={cn(
                    'flex items-center justify-center w-6 h-6 rounded-static-pill typo-body-key',
                    isActive ? 'bg-peak text-peak' : 'bg-surface text-charcoal-additive',
                  )}
                >
                  {step}
                </div>
              </div>
              <div
                className={cn(`ml-2 h-0.75 w-13.75 rounded-l-static-pill
                  ${step === totalSteps ? 'bg-transparent' : step < currentStep ? 'bg-charcoal-full' : ' bg-slate-outline'}`)}
              />
            </div>
            <span
              className={cn(
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
}
