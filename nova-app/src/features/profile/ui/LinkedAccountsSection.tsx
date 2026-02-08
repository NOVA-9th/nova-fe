'use client';

import { ItemList, SectionHeader } from '@/shared/ui';
import { LinkedAccountsSectionSkeleton } from './skeletons';
import GoogleLogoIcon from '@/shared/assets/GoogleIcon.svg';
import KakaoLogoIcon from '@/shared/assets/KakaoTalkIcon.svg';
import GithubLogoIcon from '@/shared/assets/GithubIcon.svg';
import { useConnectedAccounts } from '../hooks/useProfile';

interface LinkedAccountsSectionProps {
  memberId: number | null;
}

export const LinkedAccountsSection = ({ memberId }: LinkedAccountsSectionProps) => {
  const { data: accountsData, isLoading } = useConnectedAccounts(memberId);

  if (isLoading) {
    return <LinkedAccountsSectionSkeleton />;
  }

  if (!accountsData?.data) {
    return (
      <section className='flex flex-col justify-start items-start bg-base rounded-static-frame w-full gap-5 p-5'>
        <SectionHeader text='연결된 계정' size='lg' />
        <div className='text-optional'>연결된 계정 정보를 불러올 수 없습니다.</div>
      </section>
    );
  }

  const { googleConnected, kakaoConnected, githubConnected } = accountsData.data;

  return (
    <section className='flex flex-col justify-start items-start bg-base rounded-static-frame w-full gap-5 p-5'>
      <SectionHeader text='연결된 계정' size='lg' />
      <div className='flex flex-col gap-1 w-full items-center justify-start'>
        <ItemList
          size='lg'
          label='Google'
          description={googleConnected ? '연결됨' : '연결안됨'}
          leftIcon={GoogleLogoIcon}
          rightButton={{
            label: googleConnected ? '취소' : '연결',
            size: 'md',
            style: 'surface',
            peak: googleConnected,
          }}
          className='w-full p-2'
        />
        <ItemList
          size='lg'
          label='KakaoTalk'
          description={kakaoConnected ? '연결됨' : '연결안됨'}
          leftIcon={KakaoLogoIcon}
          rightButton={{
            label: kakaoConnected ? '취소' : '연결',
            size: 'md',
            style: 'surface',
            peak: kakaoConnected,
          }}
          className='w-full p-2'
        />
        <ItemList
          size='lg'
          label='Github'
          description={githubConnected ? '연결됨' : '연결안됨'}
          leftIcon={GithubLogoIcon}
          rightButton={{
            label: githubConnected ? '취소' : '연결',
            size: 'md',
            style: 'surface',
            peak: githubConnected,
          }}
          className='w-full p-2'
        />
      </div>
    </section>
  );
};
