'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { showToast } from '@/shared/utils/toast';
import { handleGoogleCallback, handleKakaoCallback } from '@/features/login/api/login';
import { useAuthStore } from '@/features/login/model/useAuthStore';
import { getPersonalization } from '@/features/onboarding/api/onboarding';

/**
 * URL에서 code 파라미터를 파싱하고 OAuth 콜백을 처리하는 컴포넌트
 */
const OAuthCallbackContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();

  const login = useAuthStore((state) => state.login);

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const processCallback = async () => {
      const provider = params.provider as string;

      if (provider !== 'google' && provider !== 'kakao') {
        const message = '지원하지 않는 OAuth 제공자입니다.';
        setStatus('error');
        setErrorMessage(message);
        showToast.error(message);
        setTimeout(() => router.push('/login'), 2000);
        return;
      }

      const code = searchParams.get('code');
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      if (error) {
        const message = errorDescription || error || '인증에 실패했습니다.';
        setStatus('error');
        setErrorMessage(message);
        showToast.error(message);
        setTimeout(() => router.push('/login'), 2000);
        return;
      }

      // code가 없는 경우
      if (!code) {
        setStatus('error');
        const message = '인증 코드를 받지 못했습니다.';
        setErrorMessage(message);
        showToast.error(message);
        setTimeout(() => router.push('/login'), 2000);
        return;
      }

      try {
        const response =
          provider === 'kakao'
            ? await handleKakaoCallback({ code })
            : await handleGoogleCallback({ code });

        if (response.success && response.data) {
          const { accessToken, memberId } = response.data;

          // 로그인 상태 저장
          login(accessToken, memberId);

          setStatus('success');
          showToast.success('로그인에 성공했습니다!');

          try {
            const personalization = await getPersonalization(memberId);

            if (personalization?.background === null) {
              router.replace('/onboarding?firstLogin=true'); // query param 추가
            } else {
              router.replace('/');
            }
          } catch (e) {
            console.error('개인화 조회 실패:', e);
            router.replace('/');
          }
        } else {
          const message = response.message || '로그인에 실패했습니다.';
          setStatus('error');
          setErrorMessage(message);
          showToast.error(message);
          setTimeout(() => router.push('/login'), 2000);
        }
      } catch (error: any) {
        console.error('OAuth 콜백 처리 중 오류:', error);
        setStatus('error');

        // 에러 메시지 추출
        let message = '로그인 처리 중 오류가 발생했습니다.';
        if (error?.response?.data?.message) {
          message = error.response.data.message;
        } else if (error?.message) {
          message = error.message;
        }

        setErrorMessage(message);
        showToast.error(message);
        setTimeout(() => router.push('/login'), 2000);
      }
    };

    processCallback();
  }, [searchParams, router, params, login]);

  return (
    <div className='flex items-center justify-center min-h-screen w-full bg-base'>
      <div className='text-center px-4'>
        {status === 'loading' && (
          <div className='space-y-4'>
            <div className='animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto'></div>
            <p className='text-body-base text-charcoal-additive'>로그인 처리 중...</p>
            <p className='text-footnote-base text-charcoal-optional'>잠시만 기다려주세요</p>
          </div>
        )}

        {status === 'success' && (
          <div className='space-y-4'>
            <div className='text-6xl mb-4 text-success'>✓</div>
            <p className='text-body-lg text-charcoal-base font-medium'>로그인 성공!</p>
            <p className='text-body-base text-charcoal-additive'>
              잠시 후 메인 페이지로 이동합니다.
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className='space-y-4 max-w-md'>
            <div className='text-6xl mb-4 text-error'>✗</div>
            <p className='text-body-lg text-error font-medium'>로그인 실패</p>
            <p className='text-body-base text-charcoal-additive'>{errorMessage}</p>
            <p className='text-footnote-base text-charcoal-optional'>
              잠시 후 로그인 페이지로 이동합니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * OAuth 콜백 페이지
 * URL 형식: /auth/{provider}/callback?code=xxx
 * 예시: /auth/google/callback?code=xxx 또는 /auth/kakao/callback?code=xxx
 * Suspense로 감싸서 useSearchParams 사용 시 발생할 수 있는 에러 방지
 */
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
