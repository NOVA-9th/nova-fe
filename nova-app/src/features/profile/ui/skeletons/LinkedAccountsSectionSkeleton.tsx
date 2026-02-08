'use client';

import { SectionHeader } from '@/shared/ui';
import GoogleLogoIcon from '@/shared/assets/GoogleIcon.svg';
import KakaoLogoIcon from '@/shared/assets/KakaoTalkIcon.svg';
import GithubLogoIcon from '@/shared/assets/GithubIcon.svg';
import Image from 'next/image';
import { cn } from '@/shared/utils/cn';

const rowVariants = 'flex items-center gap-2 px-2 rounded-interactive-default';

const items = [
  { icon: GoogleLogoIcon, label: 'Google' },
  { icon: KakaoLogoIcon, label: 'KakaoTalk' },
  { icon: GithubLogoIcon, label: 'Github' },
] as const;

/**
 * 연결된 계정 섹션 로딩 스켈레톤.
 * 실제 구조와 동일하게 아이콘·서비스명은 그대로 두고, 연결 여부(description)와 버튼만 스켈레톤 적용.
 */
export const LinkedAccountsSectionSkeleton = () => {
  return (
    <section className='flex flex-col justify-start items-start bg-base rounded-static-frame w-full gap-5 p-5'>
      <SectionHeader text='연결된 계정' size='lg' />
      <div className='flex flex-col gap-1 w-full items-center justify-start'>
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className={cn(rowVariants, 'w-full p-2 gap-2')} aria-hidden>
            <div className='flex items-center justify-center size-5 shrink-0'>
              {typeof Icon === 'function' ? (
                <Icon />
              ) : (
                <Image src={Icon} alt='' width={20} height={20} />
              )}
            </div>
            <div className='flex flex-col items-start justify-center gap-0.5 px-1 flex-1 min-w-0'>
              <span className='typo-body-base text-base'>{label}</span>
              {/* 연결 여부 스켈레톤 */}
              <div className='h-5 w-14 bg-alternative rounded animate-pulse' aria-hidden />
            </div>
            {/* 버튼 스켈레톤 */}
            <div className='h-9 w-14 rounded bg-alternative animate-pulse shrink-0' aria-hidden />
          </div>
        ))}
      </div>
    </section>
  );
};
