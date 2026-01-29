'use client';
import {
  LinkedAccountsSection,
  PersonalizationSettings,
  UserInfoSection,
  DataManagementSection,
} from '@/features/profile/ui';
import { PageHeader } from '@/shared/ui';
import { User } from 'lucide-react';
import { useState } from 'react';

const ProfilePage = () => {
  const [value, setValue] = useState('김진성');

  return (
    <>
      <PageHeader text='프로필' icon={User} className='' />
      <div className='flex w-full justify-start items-start bg-alternative rounded-b-static-frame'>
        <div className='flex w-full h-full justify-center items-start px-5 pb-5 gap-4'>
          <div className='flex flex-col flex-1 justify-start items-start w-full h-full gap-4'>
            <UserInfoSection
              name='이름'
              description='디자인 전공 | 프론트엔드'
              image='/test.png'
              value={value}
              setValue={setValue}
            />
            <LinkedAccountsSection />
          </div>
          <div className='flex flex-col flex-2 justify-start items-start w-full h-full gap-4'>
            <PersonalizationSettings />
            <DataManagementSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
