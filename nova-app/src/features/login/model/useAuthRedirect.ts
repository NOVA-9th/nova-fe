'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/login/model/useAuthStore';

interface UseAuthRedirectOptions {
  when: 'loggedIn' | 'loggedOut';
  redirectTo: string;
}

export const useAuthRedirect = ({ when, redirectTo }: UseAuthRedirectOptions) => {
  const router = useRouter();
  const { isLoggedIn, accessToken } = useAuthStore();

  useEffect(() => {
    const loggedIn = Boolean(accessToken && isLoggedIn);

    if ((when === 'loggedIn' && loggedIn) || (when === 'loggedOut' && !loggedIn)) {
      router.replace(redirectTo);
    }
  }, [when, redirectTo, isLoggedIn, accessToken, router]);

  return {
    isBlocked:
      (when === 'loggedIn' && Boolean(accessToken && isLoggedIn)) ||
      (when === 'loggedOut' && !Boolean(accessToken && isLoggedIn)),
  };
};
