'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { showToast } from '@/shared/utils/toast';
import { handleGoogleCallback, handleKakaoCallback } from '@/features/login/api/login';

/**
 * URL에서 code 파라미터를 파싱하고 OAuth 콜백을 처리하는 컴포넌트
 */
const OAuthCallbackContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const processCallback = async () => {
      // URL 경로에서 provider 추출 (예: /auth/google/callback 또는 /auth/kakao/callback)
      const provider = params.provider as string;

      // 유효한 provider인지 확인
      if (provider !== 'google' && provider !== 'kakao') {
        setStatus('error');
        const message = '지원하지 않는 OAuth 제공자입니다.';
        setErrorMessage(message);
        showToast.error(message);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
        return;
      }

      // URL에서 code 파라미터 파싱
      const code = searchParams.get('code');
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      // OAuth 에러가 있는 경우
      if (error) {
        setStatus('error');
        const message = errorDescription || error || '인증에 실패했습니다.';
        setErrorMessage(message);
        showToast.error(message);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
        return;
      }

      // code가 없는 경우
      if (!code) {
        setStatus('error');
        const message = '인증 코드를 받지 못했습니다.';
        setErrorMessage(message);
        showToast.error(message);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
        return;
      }

      console.log('OAuth 콜백 처리 시작:', {
        provider,
        code: code.substring(0, 20) + '...',
      });

      try {
        let response;

        // Provider에 따라 적절한 API 호출
        if (provider === 'kakao') {
          console.log('Kakao OAuth 콜백 처리 중...');
          response = await handleKakaoCallback({ code });
        } else {
          console.log('Google OAuth 콜백 처리 중...');
          response = await handleGoogleCallback({ code });
        }

        console.log('OAuth 응답:', { success: response.success, hasData: !!response.data });

        if (response.success && response.data) {
          // 토큰을 localStorage에 저장
          localStorage.setItem('accessToken', response.data.accessToken);

          // 사용자 정보도 저장
          localStorage.setItem('memberId', String(response.data.memberId));
          localStorage.setItem('userEmail', response.data.email);
          localStorage.setItem('userName', response.data.name);

          setStatus('success');
          showToast.success('로그인에 성공했습니다!');

          // 성공 후 메인 페이지로 리다이렉트
          setTimeout(() => {
            router.push('/');
          }, 1000);
        } else {
          setStatus('error');
          const message = response.message || '로그인에 실패했습니다.';
          setErrorMessage(message);
          showToast.error(message);
          setTimeout(() => {
            router.push('/login');
          }, 2000);
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
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    };

    processCallback();
  }, [searchParams, router, params]);

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
