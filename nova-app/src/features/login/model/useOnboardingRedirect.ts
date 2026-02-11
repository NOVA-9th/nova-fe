'use client';

import { useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/login/model/useAuthStore';
import { usePersonalization } from '@/shared/hooks';

interface UseOnboardingGateOptions {
  enabledPaths?: string[];
  ignorePaths?: string[];
}

export const useOnboardingGate = ({
  enabledPaths,
  ignorePaths = ['/onboarding', '/login'],
}: UseOnboardingGateOptions = {}) => {
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
  } = usePersonalization(safeMemberId ?? 0);

  const shouldIgnore = useMemo(
    () => ignorePaths.some((p) => pathname.startsWith(p)),
    [ignorePaths, pathname],
  );

  const isEnabledPath = useMemo(() => {
    if (!enabledPaths || enabledPaths.length === 0) return true;
    return enabledPaths.some((p) => pathname.startsWith(p));
  }, [enabledPaths, pathname]);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!isLoggedIn) return;
    if (shouldIgnore) return;
    if (!isEnabledPath) return;

    if (!safeMemberId) return;
    if (isLoading || isFetching) return;

    // personalization 못 가져오면 일단 패스(정책)
    if (!isSuccess || !personalization) return;

    if (personalization.data?.background === null) {
      router.replace('/onboarding?firstLogin=true');
    }
  }, [
    hasHydrated,
    isLoggedIn,
    shouldIgnore,
    isEnabledPath,
    safeMemberId,
    isLoading,
    isSuccess,
    personalization,
    router,
  ]);

  const isBlocking = hasHydrated && isLoggedIn && !shouldIgnore && isEnabledPath && isLoading;

  return { isBlocking };
};
