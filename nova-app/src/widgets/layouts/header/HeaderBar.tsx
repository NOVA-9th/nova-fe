'use client';

import { IconButton, TextInput } from '@/shared/ui';
import { Moon, Search, Sun } from 'lucide-react';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Logo, NovaLabel } from '@/shared/assets';

export const HeaderBar = () => {
  const [keyword, setKeyword] = useState('');
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === '/';

  return (
    <header className='p-4 px-5 flex justify-between items-center h-19'>
      <button
        type='button'
        aria-label='Go to home'
        className='flex items-center gap-3.5 text-base-color px-2'
        onClick={() => router.push('/')}
      >
        <Logo width={36} height={36} />
        <NovaLabel width={60} height={15.83} />
      </button>

      <div className='flex items-center gap-3'>
        {isHome && (
          <>
            <TextInput
              size='lg'
              value={keyword}
              onChange={setKeyword}
              icon={Search}
              placeholder='아티클 및 트렌드를 검색해보세요'
              className='w-100 max-sm:hidden'
            />
            <IconButton
              size='lg'
              peak={false}
              icon={Search}
              className='sm:hidden'
              aria-label='검색'
              onClick={() => {}}
            />
          </>
        )}

        <button
          type='button'
          aria-label='검색'
          className='inline-flex items-center justify-center rounded-step4 bg-surface text-additive hover:bg-surface active:bg-surface h-11 w-11'
          onClick={() => setIsDark((prev) => !prev)}
        >
          {isDark ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </header>
  );
};
