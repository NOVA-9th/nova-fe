'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SideTabItemCustom, TextBadge } from '@/shared/ui';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
import { SIDE_ITEMS } from '@/widgets/layouts/sidebar/data/SideItems';
import { useState } from 'react';
import { Modal } from '@/shared/ui';
import { showToast } from '@/shared/utils/toast';
import { useSavedCount } from './hooks/useSaveCount';
import { useAuthStore } from '@/features/login/model/useAuthStore';
import { useMemberInfo } from '@/features/profile/hooks/useProfile';
import { getProfileImageUrl } from '@/shared/utils/profileImage';
import { invalidateToken } from '@/features/login/api/login';

export const SideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { memberId, logout } = useAuthStore();
  const { data: memberInfo, isLoading, dataUpdatedAt } = useMemberInfo(memberId);

  const { data: savedCount } = useSavedCount();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLogout = async () => {
    setIsModalOpen(false);

    // 토큰 무효화 API 호출 (실패해도 로그아웃은 진행)
    try {
      await invalidateToken();
    } catch (error) {
      // 토큰 무효화 실패해도 로그아웃은 진행
      console.error('토큰 무효화 실패:', error);
    }

    logout();
    showToast.success('로그아웃 되었습니다.');
    router.push('/login');
  };

  return (
    <nav className='min-w-80 h-full px-4 pb-4 flex flex-col justify-between max-md:hidden'>
      <section className='flex flex-col gap-1'>
        {SIDE_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className='block'>
            <SideTabItemCustom peak={isActive(item.href)} icon={item.icon}>
              <div className='px-0.5 flex-1'>
                <h3>{item.title}</h3>
                <p
                  className={clsx(
                    'typo-callout-base',
                    isActive(item.href) ? 'text-additive' : 'text-optional',
                  )}
                >
                  {item.description}
                </p>
              </div>

              {item.badge && item.href === '/' && (
                <TextBadge size='sm' variant='surface' peak={false} text={item.badge} />
              )}

              {item.href === '/saved' && typeof savedCount === 'number' && (
                <TextBadge size='sm' variant='surface' peak={false} text={`${savedCount}개`} />
              )}
            </SideTabItemCustom>
          </Link>
        ))}
      </section>

      <section className='flex items-center justify-between h-14.5 px-2'>
        <div className='flex items-center gap-2 min-w-0 flex-1'>
          {isLoading ? (
            <div className='w-10 h-10 rounded-full bg-alternative animate-pulse shrink-0' />
          ) : (
            <Image
              src={getProfileImageUrl(memberInfo?.data?.profileImage, dataUpdatedAt)}
              alt='User Profile'
              width={200}
              height={200}
              className='rounded-full size-10 object-cover'
            />
          )}
          <div className='flex flex-col px-1 min-w-0 flex-1'>
            {isLoading ? (
              <>
                <div className='h-4 w-20 bg-alternative rounded animate-pulse' />
                <div className='h-3 w-28 bg-alternative rounded animate-pulse' />
              </>
            ) : (
              <>
                <h3 className='typo-body-base text-base-color truncate'>
                  {memberInfo?.data?.name ?? '사용자'}
                </h3>
                <p className='typo-callout-base text-additive truncate'>
                  {memberInfo?.data?.email ?? ''}
                </p>
              </>
            )}
          </div>
        </div>
        <button
          type='button'
          aria-label='로그아웃'
          onClick={() => setIsModalOpen(true)}
          className='text-optional hover:text-additive transition-colors outline-none shrink-0'
        >
          <LogOut size={16} />
        </button>
      </section>
      {isModalOpen && (
        <Modal
          content='로그아웃 하시겠습니까?'
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleLogout}
        />
      )}
    </nav>
  );
};
