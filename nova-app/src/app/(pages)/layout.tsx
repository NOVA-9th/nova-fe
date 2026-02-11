'use client';

import { useMemo, useLayoutEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/login/model/useAuthStore';
import { usePersonalization } from '@/shared/hooks';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken, memberId, hasHydrated } = useAuthStore();

  const isLoggedIn = Boolean(accessToken);
  const safeMemberId = useMemo(() => (memberId ? memberId : null), [memberId]);

  const {
    data: personalization,
    isLoading,
    isFetching,
    isSuccess,
  } = usePersonalization(safeMemberId);

  const shouldBlockLogin = hasHydrated && isLoggedIn && pathname === '/login';

  useLayoutEffect(() => {
    if (!shouldBlockLogin) return;
    if (!safeMemberId) return;
    if (isLoading || isFetching) return;

    if (!isSuccess || !personalization) {
      router.replace('/');
      return;
    }

    router.replace(personalization.data?.background === null ? '/onboarding' : '/');
  }, [shouldBlockLogin, safeMemberId, isLoading, isSuccess, personalization, router]);

  if (shouldBlockLogin) {
    return (
      <div className='flex items-center justify-center min-h-screen mx-auto bg-alternative px-4'>
        <div className='animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent' />
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
