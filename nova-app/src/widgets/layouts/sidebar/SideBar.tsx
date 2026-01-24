'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SideTabItemCustom, TextBadge } from '@/shared/ui';
import { MessagesSquare, ChartGantt, Bookmark, User, LogOut } from 'lucide-react';
import Image from 'next/image';

const SideBar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className='w-80 px-4 pb-4 flex flex-col justify-between'>
      <section className='flex flex-col gap-1'>
        <Link href='/' className='block'>
          <SideTabItemCustom peak={isActive('/')} icon={MessagesSquare}>
            <div className='px-0.5 flex-1'>
              <h3>피드</h3>
              <p className='text-additive typo-callout-base'>AI가 요약한 IT 뉴스</p>
            </div>
            <TextBadge size='sm' variant='surface' peak={false} text='새 게시물' />
          </SideTabItemCustom>
        </Link>

        <Link href='/trend' className='block'>
          <SideTabItemCustom peak={isActive('/trend')} icon={ChartGantt}>
            <div className='px-0.5 flex-1'>
              <h3>트렌드</h3>
              <p className='typo-callout-base'>IT 트렌드 키워드 분석 및 시각화</p>
            </div>
          </SideTabItemCustom>
        </Link>

        <Link href='/saved' className='block'>
          <SideTabItemCustom peak={isActive('/saved')} icon={Bookmark}>
            <div className='px-0.5 flex-1'>
              <h3>저장함</h3>
              <p className='typo-callout-base'>북마크한 아티클 관리</p>
            </div>
            <TextBadge size='sm' variant='surface' peak={false} text='9개' />
          </SideTabItemCustom>
        </Link>

        <Link href='/profile' className='block'>
          <SideTabItemCustom peak={isActive('/profile')} icon={User}>
            <div className='px-0.5 flex-1'>
              <h3>프로필</h3>
              <p className='typo-callout-base'>개인화 설정 및 계정 관리</p>
            </div>
          </SideTabItemCustom>
        </Link>
      </section>

      <section className='flex items-center justify-between h-14.5 px-2'>
        <div className='flex items-center gap-2'>
          <Image
            src='/test.png'
            alt='User Profile'
            width={40}
            height={40}
            className='rounded-full object-cover bg-black'
          />
          <div className='flex flex-col gap-1 px-1'>
            <h3 className='text-base-color'>조현우님</h3>
            <p className='typo-callout-base text-additive'>디자인 전공 | 프론트엔드</p>
          </div>
        </div>
        <button type='button' className='text-optional hover:text-additive transition-colors'>
          <LogOut size={16} />
        </button>
      </section>
    </nav>
  );
};

export default SideBar;
