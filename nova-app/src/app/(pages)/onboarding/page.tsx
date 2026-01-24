import Stepper from '@/features/onboarding/ui/stepper';

const OnboardingPage = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <Stepper
        totalSteps={4}
        currentStep={1}
        labels={['전공 분야', '관심 분야', '기술 역량', '관심 키워드']}
      />
      <Stepper
        totalSteps={4}
        currentStep={2}
        labels={['전공 분야', '관심 분야', '기술 역량', '관심 키워드']}
      />
      <Stepper
        totalSteps={4}
        currentStep={3}
        labels={['전공 분야', '관심 분야', '기술 역량', '관심 키워드']}
      />
      <Stepper
        totalSteps={4}
        currentStep={4}
        labels={['전공 분야', '관심 분야', '기술 역량', '관심 키워드']}
      />
    </div>
  );
};

export default OnboardingPage;
