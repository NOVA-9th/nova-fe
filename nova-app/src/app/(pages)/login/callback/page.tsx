'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { handleGoogleCallback, handleKakaoCallback } from '@/features/login/api';
import { showToast } from '@/shared/utils/toast';

const OAuthCallbackPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const processCallback = async () => {
      const code = searchParams.get('code');
      const provider = searchParams.get('provider') || 'google'; // 기본값은 google

      if (!code) {
        setStatus('error');
        showToast.error('인증 코드를 받지 못했습니다.');
        router.push('/login');
        return;
      }

      try {
        let response;
        
        if (provider === 'kakao') {
          response = await handleKakaoCallback({ code });
        } else {
          response = await handleGoogleCallback({ code });
        }

        if (response.success && response.data) {
          // 토큰을 localStorage에 저장
          localStorage.setItem('accessToken', response.data.accessToken);
          
          // 사용자 정보도 필요시 저장
          localStorage.setItem('memberId', String(response.data.memberId));
          localStorage.setItem('userEmail', response.data.email);
          localStorage.setItem('userName', response.data.name);

          setStatus('success');
          showToast.success('로그인에 성공했습니다!');
          
          // 메인 페이지로 리다이렉트 (온보딩이 필요하면 온보딩 페이지로)
          router.push('/');
        } else {
          setStatus('error');
          showToast.error(response.message || '로그인에 실패했습니다.');
          router.push('/login');
        }
      } catch (error) {
        console.error('OAuth 콜백 처리 중 오류:', error);
        setStatus('error');
        showToast.error('로그인 처리 중 오류가 발생했습니다.');
        router.push('/login');
      }
    };

    processCallback();
  }, [searchParams, router]);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='text-center'>
        {status === 'loading' && (
          <>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
            <p className='text-body-base text-charcoal-additive'>로그인 처리 중...</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className='text-4xl mb-4'>✓</div>
            <p className='text-body-base text-charcoal-additive'>로그인 성공!</p>
          </>
        )}
        {status === 'error' && (
          <>
            <div className='text-4xl mb-4 text-error'>✗</div>
            <p className='text-body-base text-error'>로그인에 실패했습니다.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default OAuthCallbackPage;

