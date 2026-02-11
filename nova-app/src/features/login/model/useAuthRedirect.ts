'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/features/login/model/useAuthStore';
import { useEffect, useMemo } from 'react';

interface UseAuthRedirectOptions {
  when: 'loggedIn' | 'loggedOut';
  redirectTo: string;
  ignorePaths?: string[];
}

export const useAuthRedirect = ({ when, redirectTo, ignorePaths = [] }: UseAuthRedirectOptions) => {
  const router = useRouter();
  const pathname = usePathname();

  const { accessToken, hasHydrated } = useAuthStore();
  const isLoggedIn = Boolean(accessToken);

  const shouldIgnore = useMemo(
    () => ignorePaths.some((p) => pathname.startsWith(p)),
    [ignorePaths, pathname],
  );

  const shouldRedirect = useMemo(() => {
    if (!hasHydrated) return false;
    if (shouldIgnore) return false;
    if (when === 'loggedIn' && isLoggedIn) return true;
    if (when === 'loggedOut' && !isLoggedIn) return true;
    return false;
  }, [hasHydrated, shouldIgnore, when, isLoggedIn]);

  useEffect(() => {
    if (!shouldRedirect) return;
    router.replace(redirectTo);
  }, [shouldRedirect, redirectTo, router]);

  return { isBlocking: !hasHydrated || shouldRedirect };
};
