'use client';

import { useState } from 'react';
import { ItemList, SectionHeader, Modal } from '@/shared/ui';
import { LinkedAccountsSectionSkeleton } from './skeletons';
import GoogleLogoIcon from '@/shared/assets/GoogleIcon.svg';
import KakaoLogoIcon from '@/shared/assets/KakaoTalkIcon.svg';
import GithubLogoIcon from '@/shared/assets/GithubIcon.svg';
import { showToast } from '@/shared/utils/toast';
import {
  useConnectedAccounts,
  useDisconnectConnectedAccount,
} from '../hooks/useProfile';
import type { ConnectedAccountProvider } from '../api/profile';

interface LinkedAccountsSectionProps {
  memberId: number | null;
}

const PROVIDER_LABELS: Record<ConnectedAccountProvider, string> = {
  google: 'Google',
  kakao: 'KakaoTalk',
  github: 'Github',
};

export const LinkedAccountsSection = ({ memberId }: LinkedAccountsSectionProps) => {
  const [disconnectModalProvider, setDisconnectModalProvider] = useState<
    ConnectedAccountProvider | null
  >(null);

  const { data: accountsData, isLoading } = useConnectedAccounts(memberId);
  const disconnectMutation = useDisconnectConnectedAccount();

  const handleDisconnectClick = (provider: ConnectedAccountProvider) => {
    setDisconnectModalProvider(provider);
  };

  const handleDisconnectConfirm = async () => {
    if (!disconnectModalProvider) return;
    try {
      await disconnectMutation.mutateAsync(disconnectModalProvider);
      setDisconnectModalProvider(null);
      showToast.success(`${PROVIDER_LABELS[disconnectModalProvider]} 계정 연결이 해제되었습니다.`);
    } catch {
      showToast.error('연결 해제에 실패했습니다.');
    }
  };

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
            onClick: googleConnected ? () => handleDisconnectClick('google') : undefined,
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
            onClick: kakaoConnected ? () => handleDisconnectClick('kakao') : undefined,
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
            onClick: githubConnected ? () => handleDisconnectClick('github') : undefined,
          }}
          className='w-full p-2'
        />
      </div>

      {disconnectModalProvider && (
        <Modal
          content={`${PROVIDER_LABELS[disconnectModalProvider]} 계정 연결을 해제할까요?`}
          confirmLabel='해제'
          onConfirm={handleDisconnectConfirm}
          onCancel={() => setDisconnectModalProvider(null)}
        />
      )}
    </section>
  );
};
