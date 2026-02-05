'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/login/model/useAuthStore';
import { HeaderBar, SideBar, FloatingBar } from '@/widgets/layouts';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!accessToken || !isLoggedIn) {
      router.replace('/login');
    }
  }, [mounted, accessToken, isLoggedIn, router]);

  if (!mounted) {
    return <div className='mx-auto flex h-dvh max-w-360 flex-col' />;
  }

  if (!accessToken || !isLoggedIn) {
    return null;
  }

  return (
    <div className='mx-auto flex h-dvh max-w-360 flex-col overflow-hidden md:border-l md:border-r border-outline'>
      <HeaderBar />

      <div className='flex min-h-0 flex-1'>
        <SideBar />
        <main className='min-w-0 flex-1 overflow-y-auto overscroll-none bg-alternative max-md:mx-4 md:mr-4 mb-4 rounded-static-frame no-scrollbar'>
          {children}
        </main>
      </div>

      <FloatingBar />
    </div>
  );
};

export default ProtectedLayout;
