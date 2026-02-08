import { MemberLevel } from '@/features/profile/api/profile';
import { create } from 'zustand';

interface OnboardingState {
  stepData: {
    step1?: string;
    step2?: number[];
    step3?: MemberLevel;
    step4?: string[];
  };
  setStepData: {
    (step: 'step1', data: string | null): void;
    (step: 'step2', data: number[]): void;
    (step: 'step3', data: MemberLevel | null): void;
    (step: 'step4', data: string[]): void;
  };
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  stepData: {},

  setStepData: (step: keyof OnboardingState['stepData'], data: any) =>
    set((state) => ({
      stepData: {
        ...state.stepData,
        [step]: data,
      },
    })),
}));
