'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SideTabItemCustom, TextBadge } from '@/shared/ui';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
import { SIDE_ITEMS } from '@/widgets/layouts/sidebar/data/SideItems';
import { useState } from 'react';
import Modal from '@/shared/ui/modal/Modal';
import { showToast } from '@/shared/utils/toast';

const SideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLogoutConfirm = () => {
    setIsModalOpen(false);
    router.push('/login');
    showToast.success('로그아웃 되었습니다.');
  };

  return (
    <nav className='w-80 px-4 pb-4 flex flex-col justify-between'>
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

              {item.badge && (
                <TextBadge size='sm' variant='surface' peak={false} text={item.badge} />
              )}
            </SideTabItemCustom>
          </Link>
        ))}
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
            <h3 className='typo-body-base text-base-color'>조현우님</h3>
            <p className='typo-callout-base text-additive'>디자인 전공 | 프론트엔드</p>
          </div>
        </div>
        <button
          type='button'
          onClick={() => setIsModalOpen(true)}
          className='text-optional hover:text-additive transition-colors'
        >
          <LogOut size={16} />
        </button>
      </section>
      {isModalOpen && (
        <Modal
          content='로그아웃 하시겠습니까?'
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleLogoutConfirm}
        />
      )}
    </nav>
  );
};

export default SideBar;
