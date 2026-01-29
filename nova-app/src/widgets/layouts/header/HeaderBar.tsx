'use client';

import { IconButton, TextInput } from '@/shared/ui';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Logo, NovaLabel } from '@/shared/assets';
import Image from 'next/image';

const HeaderBar = () => {
  const [keyword, setKeyword] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === '/';

  return (
    <header className='p-4 px-5 flex justify-between items-center h-19'>
      <button
        type='button'
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
            <IconButton size='lg' peak={false} icon={Search} className='sm:hidden' />
          </>
        )}

        <Image
          src='/test.png'
          alt='User Profile'
          width={40}
          height={40}
          className='rounded-full object-cover sm:hidden'
        />
      </div>
    </header>
  );
};

export default HeaderBar;
