'use client';

import { IconButton, TextInput } from '@/shared/ui';
import { Moon, Search, Sun, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Logo, NovaLabel } from '@/shared/assets';
import { useThemeToggle } from '@/shared/hooks';
import { useFeedFilterStore } from '@/features/feed/model/useFeedFilterStore';
import { useState } from 'react';
import clsx from 'clsx';

export const HeaderBar = () => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { searchKeyword, setSearchKeyword } = useFeedFilterStore();
  const pathname = usePathname();
  const router = useRouter();

  const isInputVisible = pathname === '/';

  const { isDark, toggleTheme } = useThemeToggle();

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
            <TextInput
              size='lg'
              value={searchKeyword}
              onChange={setSearchKeyword}
              icon={Search}
              placeholder='아티클 및 트렌드를 검색해보세요'
              className='w-100 max-md:hidden'
            />
            <IconButton
              size='lg'
              peak={false}
              icon={isMobileSearchOpen ? X : Search}
              className='md:hidden'
              aria-label='검색'
              onClick={() => {
                setIsMobileSearchOpen((prev) => !prev);
              }}
            />
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
