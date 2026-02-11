'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { showToast } from '@/shared/utils/toast';
import {
  handleGoogleCallback,
  handleKakaoCallback,
  handleGithubCallback,
  handleGoogleConnect,
  handleKakaoConnect,
  handleGithubConnect,
} from '@/features/login/api/login';
import { useAuthStore } from '@/features/login/model/useAuthStore';
import { usePersonalization } from '@/shared/hooks/usePersonalization';

const OAuthCallbackContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const login = useAuthStore((state) => state.login);

  const [memberId, setMemberId] = useState<number | null>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(3);
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);

  const { data: personalization, isSuccess } = usePersonalization(memberId ?? 0);

  // OAuth 처리
  useEffect(() => {
    const processCallback = async () => {
      const provider = params.provider as string;
      if (provider !== 'google' && provider !== 'kakao' && provider !== 'github') {
        const message = '지원하지 않는 OAuth 제공자입니다.';
        setStatus('error');
        setErrorMessage(message);
        showToast.error(message);
        return;
      }

      const code = searchParams.get('code');
      const state = searchParams.get('state') || 'login'; // 기본값은 'login'
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      if (error) {
        const message = errorDescription || error || '인증에 실패했습니다.';
        setStatus('error');
        setErrorMessage(message);
        showToast.error(message);
        return;
      }

      if (!code) {
        const message = '인증 코드를 받지 못했습니다.';
        setStatus('error');
        setErrorMessage(message);
        showToast.error(message);
        return;
      }

      try {
        // state에 따라 다른 API 호출
        if (state === 'connect') {
          // 연결(connect) API 호출
          let response;
          if (provider === 'kakao') {
            response = await handleKakaoConnect({ code });
          } else if (provider === 'github') {
            response = await handleGithubConnect({ code });
          } else {
            response = await handleGoogleConnect({ code });
          }

          // connect API는 null을 반환하므로 성공 여부만 확인
          if (response.success) {
            setStatus('success');
            showToast.success('계정 연결에 성공했습니다!');
            // 프로필 페이지로 리다이렉트
            setTimeout(() => router.push('/profile'), 3000);
          } else {
            const message = response.message || '계정 연결에 실패했습니다.';
            setStatus('error');
            setErrorMessage(message);
            showToast.error(message);
            setTimeout(() => router.push('/profile'), 3000);
          }
        } else {
          // 로그인(login) API 호출
          let response;
          if (provider === 'kakao') {
            response = await handleKakaoCallback({ code });
          } else if (provider === 'github') {
            response = await handleGithubCallback({ code });
          } else {
            response = await handleGoogleCallback({ code });
          }

          if (response.success && response.data) {
            const { accessToken, memberId } = response.data;

            login(accessToken, memberId);
            setMemberId(memberId);

            setStatus('success');
            showToast.success('로그인에 성공했습니다!');
          } else {
            const message = response.message || '로그인에 실패했습니다.';
            setStatus('error');
            setErrorMessage(message);
            showToast.error(message);
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const message =
          error?.response?.data?.message || error?.message || '로그인 처리 중 오류가 발생했습니다.';
        console.error('OAuth 콜백 처리 중 오류:', error);
        setStatus('error');
        setErrorMessage(message);
      }
    };

    processCallback();
  }, [searchParams, router, params, login]);

  // 카운트다운 타이머
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      setCountdown(3);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShouldRedirect(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [status]);

  // 성공 시 리다이렉트 (personalization 완료 + 카운트다운 완료 후)
  useEffect(() => {
    if (status === 'success' && shouldRedirect && isSuccess && personalization) {
      if (personalization.data?.background === null) {
        router.replace('/onboarding?firstLogin=true');
      } else {
        router.replace('/');
      }
    }
  }, [status, shouldRedirect, isSuccess, personalization, router]);

  // 실패 시 리다이렉트 (카운트다운 완료 후)
  useEffect(() => {
    if (status === 'error' && shouldRedirect) {
      router.push('/login');
    }
  }, [status, shouldRedirect, router]);

  return (
    <div className='flex items-center justify-center min-h-screen w-full bg-base'>
      <div className='text-center px-4'>
        {status === 'loading' && (
          <div className='space-y-4'>
            <div className='animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto' />
            <p className='text-body-base text-additive'>로그인 처리 중...</p>
            <p className='text-footnote-base text-optional'>잠시만 기다려주세요</p>
          </div>
        )}

        {status === 'success' && (
          <>
            {memberId && !isSuccess ? (
              // personalization 로딩 중
              <div className='space-y-4'>
                <div className='animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto' />
                <p className='text-body-base text-additive'>로그인 처리 중...</p>
                <p className='text-footnote-base text-optional'>잠시만 기다려주세요</p>
              </div>
            ) : isSuccess && personalization && personalization.data?.background === null ? (
              // 처음 로그인인 경우
              <div className='space-y-4'>
                <div className='text-6xl mb-4 text-success'>✓</div>
                <p className='text-body-lg text-additive font-medium'>환영합니다!</p>
                <p className='text-body-base text-optional'>맞춤 추천을 위해 몇 가지만 알려주세요.</p>
                <p className='text-body-base text-optional'>{countdown}초후 초기 설정 페이지로 이동합니다.</p>
              </div>
            ) : (
              // 기존 로그인인 경우
              <div className='space-y-4'>
                <div className='text-6xl mb-4 text-success'>✓</div>
                <p className='text-body-lg text-additive font-medium'>로그인 성공!</p>
                <p className='text-body-base text-optional'>{countdown}초후 메인 페이지로 이동합니다.</p>
              </div>
            )}
          </>
        )}

        {status === 'error' && (
          <div className='space-y-4 max-w-md'>
            <div className='text-6xl mb-4 text-error'>✗</div>
            <p className='text-body-lg text-error font-medium'>로그인 실패</p>
            <p className='text-body-base text-additive'>{errorMessage}</p>
            <p className='text-footnote-base text-optional'>{countdown}초후 로그인 페이지로 이동합니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const OAuthCallbackPage = () => {
  return (
    <Suspense
      fallback={
        <div className='flex items-center justify-center min-h-screen bg-base'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4'></div>
            <p className='text-body-base text-charcoal-additive'>로딩 중...</p>
          </div>
        </div>
      }
    >
      <OAuthCallbackContent />
    </Suspense>
  );
};

export default OAuthCallbackPage;
