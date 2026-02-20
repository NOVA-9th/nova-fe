'use client';

import { IconButton } from '@/shared/ui';
import { Moon, Search, Sun, Ticket, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useThemeToggle } from '@/shared/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { LogoLabel } from '@/widgets/layouts/header/ui/LogoLabel';
import { HeaderSearch } from '@/widgets/layouts/header/ui/HeaderSearch';

export const HeaderBar = () => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { isDark, toggleTheme } = useThemeToggle();

  const isInputVisible = useMemo(() => pathname === '/feed', [pathname]);

  const goFeed = useCallback(() => router.push('/feed'), [router]);
  const openMobileSearch = useCallback(() => setIsMobileSearchOpen(true), []);
  const closeMobileSearch = useCallback(() => setIsMobileSearchOpen(false), []);

  useEffect(() => {
    setIsMobileSearchOpen(false);
  }, [pathname]);

  return (
    <header
      className={clsx(
        'p-4 px-5 flex flex-wrap justify-between items-center gap-4',
        isMobileSearchOpen ? 'h-auto' : 'h-19',
      )}
    >
      <LogoLabel onClick={goFeed} />

      <div className='flex items-center gap-3'>
        <div className='md:hidden'>
          <IconButton
            size='lg'
            peak={false}
            icon={Ticket}
            aria-label='이벤트'
            onClick={() => router.push('/event')}
          />
        </div>
        {isInputVisible && (
          <>
            {isMobileSearchOpen ? (
              <IconButton
                size='lg'
                peak={false}
                icon={X}
                className='md:hidden'
                aria-label='검색 닫기'
                onClick={closeMobileSearch}
              />
            ) : (
              <>
                <div className='hidden md:block'>
                  <HeaderSearch className='w-100' />
                </div>

                <div className='md:hidden'>
                  <IconButton
                    size='lg'
                    peak={false}
                    icon={Search}
                    aria-label='검색'
                    onClick={openMobileSearch}
                  />
                </div>
              </>
            )}
          </>
        )}

        <button
          type='button'
          aria-label='테마 전환'
          className='inline-flex items-center justify-center rounded-step4 bg-surface text-additive hover:bg-surface active:bg-surface h-11 w-11 outline-none'
          onClick={toggleTheme}
        >
          {isDark ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </div>

      {isInputVisible && isMobileSearchOpen && (
        <div className='md:hidden w-full'>
          <HeaderSearch className='w-full' />
        </div>
      )}
    </header>
  );
};
