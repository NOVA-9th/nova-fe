'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui';
import { useAuthStore } from '@/features/login/model/useAuthStore';
import { ArrowDown } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { isLoggedIn, isFirstVisit, hasHydrated, setFirstVisit } = useAuthStore();
  
  // Intersection Observer를 위한 refs
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

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

  // Intersection Observer 설정
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 뷰포트에 들어오면 보이기
            entry.target.classList.add('animate-slide-up-visible');
          } else {
            // 뷰포트를 벗어나면 다시 숨기기
            entry.target.classList.remove('animate-slide-up-visible');
          }
        });
      },
      {
        threshold: 0.1, // 10%만 보여도 트리거
        rootMargin: '0px 0px -50px 0px', // 하단에서 50px 전에 트리거
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [hasHydrated, isLoggedIn, isFirstVisit]);

  // Hydration 전이거나 리다이렉트 조건이면 아무것도 렌더링하지 않음
  if (!hasHydrated || isLoggedIn || !isFirstVisit) {
    return null;
  }

  return (
    <main className='flex min-h-screen flex-col items-center gap-16 bg-base px-4 pb-12 pt-12 sm:gap-12 sm:px-6 sm:pb-16 sm:pt-16 md:gap-16 md:pt-20'>
      {/* Hero Section */}
      <section className='flex w-full max-w-2xl flex-col items-center gap-9 text-center sm:gap-6'>
        {/* Text Content */}
        <div className='space-y-1 px-0 sm:space-y-0.5 sm:px-2'>
          <p className='typo-callout-base text-optional sm:typo-callout-base'>
            Next opportunity, Vision & Analysis
          </p>
          <h1 className='typo-body-strong sm:typo-title-key text-[#4A5565]'>
            빠르게 변화하는 IT 트렌드를 AI가 분석하고 요약해
          </h1>
          <p className='typo-footnote-strong text-additive sm:typo-body-base '>
            취업준비생과 학습자에게 맞춤형 인사이트를 제공합니다.
          </p>
        </div>

        {/* Logos - Responsive sizing */}
        <div className='flex items-center gap-1 sm:gap-2 bg-white px-5 pr-2 rounded-3xl'>
          <div className='relative h-[45px] w-[180px] sm:h-[55px] sm:w-[220px] md:h-[65px] md:w-[258px]'>
            <Image src='/nova.svg' alt='nova' fill className='object-contain' priority />
          </div>
          <div className='relative size-[80px] shrink-0 sm:size-[100px] md:size-[120px]'>
            <Image src='/Logo.svg' alt='NOVA' fill className='object-contain' priority />
          </div>
        </div>

        {/* CTA Buttons - Responsive width */}
        <Button
          label='지금 시작하기'
          size='lg'
          peak
          style='surface'
          onClick={() => {
            setFirstVisit(false);
            router.push('/login');
          }}
          className='flex-1 text-sm sm:text-base'
        />

        <div className='mt-8 flex flex-col items-center gap-5'>
          <h1 className='typo-headline-base text-additive'>서비스 살펴보기</h1>
          <ArrowDown className='size-6 text-base-color animate-bounce' />
        </div>
      </section>

      {/* App Preview - Responsive sizing */}
      <section id='preview' className='flex flex-col gap-20 w-full max-w-3xl px-2 sm:px-4'>
        <div
          ref={(el) => {
            sectionRefs.current[0] = el;
          }}
          className='flex flex-col items-center gap-5 animate-slide-up b'
        >
          <h1 className='typo-callout-key sm:typo-title-strong text-black-white'>AI가 요약한 IT 뉴스와 근거 자료를 한눈에 확인하세요!</h1>
          <picture>
            <source media='(max-width: 640px)' srcSet='/LandingFeedMb.png' />
            <img
              src='/LandingFeed.png'
              alt='NOVA 피드 페이지 미리보기'
              className='h-auto max-w-60 rounded-lg object-contain sm:max-w-full sm:rounded-xl md:rounded-2xl'
            />
          </picture>
        </div>

        <div
          ref={(el) => {
            sectionRefs.current[1] = el;
          }}
          className='flex flex-col items-center gap-5 animate-slide-up-on-scroll'
        >
          <h1 className='typo-callout-key sm:typo-title-strong text-black-white'>관심 있는 키워드의 추세를 차트로 파악하세요!</h1>
          <picture>
            <source media='(max-width: 640px)' srcSet='/LandingTrendMb.png' />
            <img
              src='/LandingTrend.png'
              alt='NOVA 트렌드 페이지 미리보기'
              className='h-auto max-w-60 rounded-lg object-contain sm:max-w-full sm:rounded-xl md:rounded-2xl'
            />
          </picture>
        </div>

        <div
          ref={(el) => {
            sectionRefs.current[2] = el;
          }}
          className='flex flex-col items-center gap-5 animate-slide-up-on-scroll'
        >
          <h1 className='typo-callout-key sm:typo-title-strong text-black-white'>관심 콘텐츠를 저장하고, 나만의 기술 아카이브를 만드세요</h1>
          <picture>
            <source media='(max-width: 640px)' srcSet='/LandingSavedMb.png' />
            <img
              src='/LandingSaved.png'
              alt='NOVA 저장함 페이지 미리보기'
              className='h-auto max-w-60 rounded-lg object-contain sm:max-w-full sm:rounded-xl md:rounded-2xl'
            />
          </picture>
        </div>
      </section>

      <section
        ref={(el) => {
          sectionRefs.current[3] = el;
        }}
        className='flex flex-col items-center gap-5 animate-slide-up-on-scroll'
      >
        <h1 className='typo-callout-base sm:typo-headline-base text-black-white'>Google, 카카오, GitHub 계정으로 3초 만에 바로 시작하세요!</h1>
        <Button
            label='지금 시작하기'
            size='lg'
            peak
            style='surface'
            onClick={() => {
              setFirstVisit(false);
              router.push('/login');
            }}
            className='flex-1 text-sm sm:text-base'
          />
      </section>
    </main>
  );
}
