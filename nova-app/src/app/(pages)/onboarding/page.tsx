'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingContainer } from '@/features/onboarding/ui/OnboardingContainer';
import { useAuthStore } from '@/features/login/model/useAuthStore';

const OnboardingPage = () => {
  const router = useRouter();
  const { isLoggedIn, hasHydrated } = useAuthStore();

  useEffect(() => {
    // Zustand hydration 완료 후에만 체크
    if (!hasHydrated) return;

    // 로그인 안되어있으면 로그인 페이지로
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, hasHydrated, router]);

  // Hydration 전이거나 로그인 안된 경우 아무것도 렌더링하지 않음
  if (!hasHydrated || !isLoggedIn) {
    return null;
  }

  return <OnboardingContainer />;
};

export default OnboardingPage;
