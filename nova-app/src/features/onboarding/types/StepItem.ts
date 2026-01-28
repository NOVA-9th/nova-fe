import type { ComponentType } from 'react';

export type Step = 'step1' | 'step2' | 'step3' | 'step4';

export type StepComponent = {
  onValidChange: (isValid: boolean) => void;
};

export type StepItem = {
  label: string;
  description: string;
  Component: ComponentType<StepComponent>;
};
