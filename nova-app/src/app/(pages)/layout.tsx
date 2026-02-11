'use client';

import { useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/login/model/useAuthStore';
import { usePersonalization } from '@/shared/hooks';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken, memberId, hasHydrated } = useAuthStore();

  const safeMemberId = useMemo(() => (memberId ? memberId : null), [memberId]);

  const { data: personalization, isLoading, isSuccess } = usePersonalization(safeMemberId ?? 0);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!accessToken) return;
    if (pathname !== '/login') return;

    // memberId 없으면 personalization 판단 불가 → 대기
    if (!safeMemberId) return;

    if (isLoading) return;

    // personalization 실패하면 일단 홈(정책)
    if (!isSuccess || !personalization) {
      router.replace('/');
      return;
    }

    if (personalization.data?.background === null) {
      router.replace('/onboarding');
    } else {
      router.replace('/');
    }
  }, [
    hasHydrated,
    accessToken,
    pathname,
    safeMemberId,
    isLoading,
    isSuccess,
    personalization,
    router,
  ]);

  const isBlocking =
    hasHydrated && accessToken && pathname === '/login' && (!safeMemberId || isLoading);

  if (isBlocking) {
    return (
      <div className='flex items-center justify-center min-h-screen mx-auto bg-alternative px-4'>
        <div className='w-10 h-10 rounded-full bg-alternative animate-pulse shrink-0' />
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center min-h-screen mx-auto bg-alternative px-4'>
      {children}
    </div>
  );
};

export default PublicLayout;
