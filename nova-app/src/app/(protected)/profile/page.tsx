'use client';
import {
  LinkedAccountsSection,
  PersonalizationSettings,
  UserInfoSection,
  DataManagementSection,
} from '@/features/profile/ui';
import { useAuthStore } from '@/features/login/model/useAuthStore';
import { PageHeader } from '@/shared/ui';
import { User } from 'lucide-react';

const ProfilePage = () => {
  const { memberId } = useAuthStore();

  return (
    <>
      <PageHeader text='프로필' icon={User} />
      <div className='flex w-full justify-start items-start bg-alternative rounded-b-static-frame'>
        <div className='flex flex-col xl:flex-row w-full h-full justify-center items-start md:px-5 px-4 pb-5 gap-4'>
          <div className='flex flex-col flex-1 justify-start items-start w-full h-full gap-4'>
            <UserInfoSection memberId={memberId} />
            <LinkedAccountsSection memberId={memberId} />
          </div>
          <div className='flex flex-col flex-2 justify-start items-start w-full h-full gap-4 min-w-0'>
            <PersonalizationSettings memberId={memberId} />
            <DataManagementSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
