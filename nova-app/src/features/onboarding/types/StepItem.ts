import type { ComponentType } from 'react';

export type Step = 1 | 2 | 3 | 4;

export interface StepComponentProps {
  onValidChange: (isValid: boolean) => void;
}
export type StepItem = {
  label: string;
  description: string;
  Component: ComponentType<StepComponentProps>;
};
