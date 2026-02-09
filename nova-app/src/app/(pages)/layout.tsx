'use client';

import { useAuthRedirect } from '@/features/login/model/useAuthRedirect';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const { isBlocked } = useAuthRedirect({
    when: 'loggedIn',
    redirectTo: '/',
  });

  if (isBlocked) return null;

  return (
    <div className='flex items-center justify-center min-h-screen mx-auto bg-alternative px-4'>
      {children}
    </div>
  );
};

export default PublicLayout;
