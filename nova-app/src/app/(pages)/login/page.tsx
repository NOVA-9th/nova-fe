'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/features/login/ui/LoginForm';
import { useAuthStore } from '@/features/login/model/useAuthStore';

const LoginPage = () => {
  const router = useRouter();
  const { isLoggedIn, hasHydrated } = useAuthStore();

  useEffect(() => {
    // Zustand hydration 완료 후에만 체크
    if (!hasHydrated) return;

    // 이미 로그인 되어있으면 feed 페이지로
    if (isLoggedIn) {
      router.push('/feed');
    }
  }, [isLoggedIn, hasHydrated, router]);

  // Hydration 전이거나 이미 로그인된 경우 아무것도 렌더링하지 않음
  if (!hasHydrated || isLoggedIn) {
    return null;
  }

  return <LoginForm />;
};

export default LoginPage;
