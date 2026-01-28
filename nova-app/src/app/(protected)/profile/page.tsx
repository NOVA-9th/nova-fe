'use client';
import { LinkedAccountsSection } from '@/features/profile/LinkedAccountsSection';
import { UserInfoSection } from '@/features/profile/UserInfoSection';
import { SectionHeader } from '@/shared/ui';
import { User } from 'lucide-react';
import { useState } from 'react';

const ProfilePage = () => {
  const [value, setValue] = useState('김진성');

  return (
    <>
      <header className='flex h-15 p-4 w-full rounded-static-frame bg-alternative'>
        <SectionHeader text='프로필' size='sm' leftIcon={User} className='px-2' />
      </header>
      <div className='flex w-full h-full justify-start items-center bg-alternative'>
        <div className='flex w-full h-full justify-center items-center px-5 pb-5 gap-4'>
          <div className='flex flex-col justify-start items-start w-full h-full gap-4'>
            <UserInfoSection
              name='이름'
              description='디자인 전공 | 프론트엔드'
              image='/test.png'
              value={value}
              setValue={setValue}
            />
            <LinkedAccountsSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
