'use client';

import { useAuthStore } from '@/features/login/model/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (accessToken && isLoggedIn) {
      router.replace('/');
    }
  }, [accessToken, isLoggedIn, router]);

  if (accessToken && isLoggedIn) {
    return null;
  }

  return (
    <div className='flex items-center justify-center min-h-screen mx-auto bg-white-full px-4'>
      {children}
    </div>
  );
};

export default PublicLayout;
