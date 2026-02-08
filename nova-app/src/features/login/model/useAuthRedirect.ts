'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from './useAuthStore';
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

  useEffect(() => {
    if (!hasHydrated) return;
    if (shouldIgnore) return;

    if (when === 'loggedIn' && isLoggedIn) {
      router.replace(redirectTo);
    }

    if (when === 'loggedOut' && !isLoggedIn) {
      router.replace(redirectTo);
    }
  }, [hasHydrated, shouldIgnore, when, isLoggedIn, redirectTo, router]);

  return {
    isBlocked: !hasHydrated, // ⭐ 여기만 막아야 함
  };
};
