'use client';

import { useAuthRedirect } from '@/features/login/model/useAuthRedirect';
import UpScrollButton from '@/shared/ui/action/UoScrollButton';
import { useOnboardingGate } from '@/features/login/model/useOnboardingRedirect';
import { HeaderBar, SideBar, FloatingBar } from '@/widgets/layouts';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { isBlocking: authBlocking } = useAuthRedirect({
    when: 'loggedOut',
    redirectTo: '/login',
  });

  const { isBlocking: onboardingBlocking } = useOnboardingGate();

  if (authBlocking || onboardingBlocking) return null;

  return (
    <div className='mx-auto flex h-dvh max-w-360 flex-col overflow-hidden md:border-l md:border-r border-outline'>
      <HeaderBar />
      <div className='flex min-h-0 flex-1'>
        <SideBar />
        <main className='min-w-0 flex-1 overflow-y-auto overscroll-none bg-alternative md:mr-4 mb-20 md:mb-4 rounded-static-frame no-scrollbar'>
          {children}
        </main>
      </div>
      <FloatingBar />
      <UpScrollButton />
    </div>
  );
};

export default ProtectedLayout;
