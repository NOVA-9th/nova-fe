'use client';

import { useState } from 'react';
import { ItemList, SectionHeader, Modal } from '@/shared/ui';
import { LinkedAccountsSectionSkeleton } from '@/features/profile/ui/skeletons';
import GoogleLogoIcon from '@/shared/assets/GoogleIcon.svg';
import KakaoLogoIcon from '@/shared/assets/KakaoTalkIcon.svg';
import GithubLogoIcon from '@/shared/assets/GithubIcon.svg';
import { showToast } from '@/shared/utils/toast';
import {
  useConnectedAccounts,
  useDisconnectConnectedAccount,
} from '@/features/profile/hooks/useProfile';
import type { ConnectedAccountProvider } from '@/features/profile/api/profile';
import { redirectToGoogle, redirectToKakao, redirectToGithub } from '@/features/login/api/login';

interface LinkedAccountsSectionProps {
  memberId: number | null;
}

const PROVIDER_LABELS: Record<ConnectedAccountProvider, string> = {
  google: 'Google',
  kakao: 'KakaoTalk',
  github: 'Github',
};

export const LinkedAccountsSection = ({ memberId }: LinkedAccountsSectionProps) => {
  const [disconnectModalProvider, setDisconnectModalProvider] =
    useState<ConnectedAccountProvider | null>(null);

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

  const handleConnectClick = (provider: ConnectedAccountProvider) => {
    // state='connect'로 리다이렉트
    switch (provider) {
      case 'google':
        redirectToGoogle('connect');
        break;
      case 'kakao':
        redirectToKakao('connect');
        break;
      case 'github':
        redirectToGithub('connect');
        break;
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
  const connectedCount = [googleConnected, kakaoConnected, githubConnected].filter(Boolean).length;
  const isDisconnectDisabled = connectedCount <= 1;

  const getDisconnectButtonProps = (connected: boolean, provider: ConnectedAccountProvider) => {
    const isCancel = connected;
    const canDisconnect = isCancel && !isDisconnectDisabled;
    return {
      label: connected ? '취소' : '연결',
      size: 'md' as const,
      style: 'surface' as const,
      peak: connected,
      onClick:
        isCancel && canDisconnect
          ? () => handleDisconnectClick(provider)
          : !connected
            ? () => handleConnectClick(provider)
            : undefined,
      disabled: isCancel && isDisconnectDisabled,
    };
  };

  return (
    <section className='flex flex-col justify-start items-start bg-base rounded-static-frame w-full gap-5 p-5 border border-outline'>
      <SectionHeader text='연결된 계정' size='lg' />
      <div className='flex flex-col gap-1 w-full items-center justify-start'>
        <ItemList
          size='lg'
          label='Google'
          description={googleConnected ? '연결됨' : '연결안됨'}
          leftIcon={GoogleLogoIcon}
          rightButton={getDisconnectButtonProps(googleConnected, 'google')}
          className='w-full p-2'
        />
        <ItemList
          size='lg'
          label='KakaoTalk'
          description={kakaoConnected ? '연결됨' : '연결안됨'}
          leftIcon={KakaoLogoIcon}
          rightButton={getDisconnectButtonProps(kakaoConnected, 'kakao')}
          className='w-full p-2'
        />
        <ItemList
          size='lg'
          label='Github'
          description={githubConnected ? '연결됨' : '연결안됨'}
          leftIcon={GithubLogoIcon}
          rightButton={getDisconnectButtonProps(githubConnected, 'github')}
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
