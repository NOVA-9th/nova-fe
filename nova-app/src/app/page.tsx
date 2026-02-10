'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui';
import { useAuthStore } from '@/features/login/model/useAuthStore';

export default function LandingPage() {
  const router = useRouter();
  const { isLoggedIn, isFirstVisit, hasHydrated, setFirstVisit } = useAuthStore();

  useEffect(() => {
    // Zustand hydration 완료 후에만 체크
    if (!hasHydrated) return;

    // 로그인 되어있으면 feed 페이지로
    if (isLoggedIn) {
      router.push('/feed');
      return;
    }

    // 첫 방문이 아니면 로그인 페이지로
    if (!isFirstVisit) {
      router.push('/login');
    }
  }, [isLoggedIn, isFirstVisit, hasHydrated, router]);

  // Hydration 전이거나 리다이렉트 조건이면 아무것도 렌더링하지 않음
  if (!hasHydrated || isLoggedIn || !isFirstVisit) {
    return null;
  }

  return (
    <main className='flex min-h-screen flex-col items-center gap-8 bg-base px-4 pb-12 pt-12 sm:gap-12 sm:px-6 sm:pb-16 sm:pt-16 md:gap-16 md:pt-20'>
      {/* Hero Section */}
      <section className='flex w-full max-w-2xl flex-col items-center gap-4 text-center sm:gap-6'>
        {/* Text Content */}
        <div className='space-y-1 px-2 sm:space-y-1.5'>
          <p className='text-xs text-optional sm:typo-callout-base'>
            Next opportunity, Vision & Analysis
          </p>
          <h1 className='text-lg font-semibold leading-tight tracking-tight text-base-color sm:typo-title-key'>
            빠르게 변화하는 IT 트렌드를 AI가 분석하고 요약해
          </h1>
          <p className='text-sm text-additive sm:typo-body-base'>
            취업준비생과 학습자에게 맞춤형 인사이트를 제공합니다.
          </p>
        </div>

        {/* Logos - Responsive sizing */}
        <div className='flex items-center gap-2 sm:gap-3'>
          <div className='relative h-[45px] w-[180px] sm:h-[55px] sm:w-[220px] md:h-[65px] md:w-[258px]'>
            <Image src='/nova.svg' alt='nova' fill className='object-contain' priority />
          </div>
          <div className='relative size-[80px] shrink-0 sm:size-[100px] md:size-[120px]'>
            <Image src='/Logo.svg' alt='NOVA' fill className='object-contain' priority />
          </div>
        </div>

        {/* CTA Buttons - Responsive width */}
        <div className='flex w-full max-w-[280px] gap-2 sm:max-w-xs'>
          <Button
            label='시작하기'
            size='lg'
            peak
            style='surface'
            onClick={() => {
              setFirstVisit(false);
              router.push('/login');
            }}
            className='flex-1 text-sm sm:text-base'
          />
          <Button
            label='더 알아보기'
            size='lg'
            style='surface'
            peak={false}
            onClick={() =>
              document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' })
            }
            className='flex-1 text-sm sm:text-base'
          />
        </div>
      </section>

      {/* App Preview - Responsive sizing */}
      <section id='preview' className='w-full max-w-4xl px-2 sm:px-4'>
        <img
          src='/LandingImage.png'
          alt='NOVA 앱 미리보기'
          className='h-auto w-full animate-slide-up rounded-lg object-contain sm:rounded-xl md:rounded-2xl'
        />
      </section>
    </main>
  );
}
