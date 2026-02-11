'use client';

import { IconButton, TextInput } from '@/shared/ui';
import { Moon, Search, Sun, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Logo, NovaLabel } from '@/shared/assets';
import { useThemeToggle } from '@/shared/hooks';
import { useFeedFilterStore } from '@/features/feed/model/useFeedFilterStore';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

export const HeaderBar = () => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { searchKeyword, setSearchKeyword } = useFeedFilterStore();
  const pathname = usePathname();
  const router = useRouter();

  const isInputVisible = pathname === '/';
  const { isDark, toggleTheme } = useThemeToggle();

  useEffect(() => {
    // 첫 렌더링 때도 무조건 닫힘 보장
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileSearchOpen(false);

    const handleResize = () => {
      // 화면 사이즈 바뀌면 무조건 닫기
      setIsMobileSearchOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      className={clsx(
        'p-4 px-5 flex flex-wrap justify-between items-center gap-4',
        isMobileSearchOpen ? 'h-auto' : 'h-19',
      )}
    >
      <button
        type='button'
        aria-label='Go to home'
        className='flex items-center gap-3.5 text-base-color px-2'
        onClick={() => router.push('/')}
      >
        <Logo width={36} height={36} />
        <NovaLabel className='text-base-color' width={60} height={15.83} />
      </button>

      <div className='flex items-center gap-3'>
        {isInputVisible && (
          <>
            {isMobileSearchOpen ? (
              <IconButton
                size='lg'
                peak={false}
                icon={X}
                className='md:hidden'
                aria-label='검색 닫기'
                onClick={() => setIsMobileSearchOpen(false)}
              />
            ) : (
              <>
                <div className='hidden md:block'>
                  <TextInput
                    size='lg'
                    value={searchKeyword}
                    onChange={setSearchKeyword}
                    icon={Search}
                    placeholder='아티클 및 트렌드를 검색해보세요'
                    className='w-100'
                  />
                </div>

                <div className='md:hidden'>
                  <IconButton
                    size='lg'
                    peak={false}
                    icon={Search}
                    aria-label='검색'
                    onClick={() => setIsMobileSearchOpen(true)}
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
          <TextInput
            size='lg'
            value={searchKeyword}
            onChange={setSearchKeyword}
            icon={Search}
            placeholder='아티클 및 트렌드를 검색해보세요'
            className='w-full'
          />
        </div>
      )}
    </header>
  );
};
