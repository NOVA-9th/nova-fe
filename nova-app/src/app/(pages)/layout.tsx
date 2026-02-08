'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/login/model/useAuthStore';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (!accessToken) return;

    if (pathname === '/login') {
      router.replace('/');
    }
  }, [pathname, accessToken, router]);

  return (
    <div className='flex items-center justify-center min-h-screen mx-auto bg-white-full px-4'>
      {children}
    </div>
  );
};

export default PublicLayout;
