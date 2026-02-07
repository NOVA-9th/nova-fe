import { create } from 'zustand';

interface OnboardingState {
  stepData: {
    step1?: string[];
    step2?: string[];
    step3?: string[];
    step4?: string[];
  };
  setStepData: (step: keyof OnboardingState['stepData'], data: string[]) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  stepData: {},
  setStepData: (step, data) =>
    set((state) => ({
      stepData: {
        ...state.stepData,
        [step]:
          step === 'step1' || step === 'step3'
            ? data.slice(0, 1)
            : step === 'step2'
              ? data.slice(0, 2)
              : step === 'step4'
                ? data.slice(0, 5)
                : data,
      },
    })),
}));
