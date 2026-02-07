import { useRouter } from 'next/navigation';
import { useAuthStore } from './useAuthStore';
import { useEffect } from 'react';

interface UseAuthRedirectOptions {
  when: 'loggedIn' | 'loggedOut';
  redirectTo: string;
  ignorePaths?: string[]; // 예외 경로
}

export const useAuthRedirect = ({ when, redirectTo, ignorePaths = [] }: UseAuthRedirectOptions) => {
  const router = useRouter();
  const { isLoggedIn, accessToken } = useAuthStore();
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  useEffect(() => {
    const loggedIn = Boolean(accessToken && isLoggedIn);

    if (ignorePaths.some((p) => pathname.startsWith(p))) return;

    if ((when === 'loggedIn' && loggedIn) || (when === 'loggedOut' && !loggedIn)) {
      router.replace(redirectTo);
    }
  }, [when, redirectTo, isLoggedIn, accessToken, router, pathname, ignorePaths]);

  return {
    isBlocked:
      (when === 'loggedIn' && Boolean(accessToken && isLoggedIn)) ||
      (when === 'loggedOut' && !Boolean(accessToken && isLoggedIn)),
  };
};
