'use client';

import { TextInput } from '@/shared/ui';
import { Lightbulb, Search } from 'lucide-react';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const HeaderBar = () => {
  const [keyword, setKeyword] = useState('');
  const pathname = usePathname();
  const router = useRouter(); // ✅ 추가

  const isHome = pathname === '/';

  return (
    <header className='p-4 px-5 flex justify-between items-center h-19'>
      <button
        type='button'
        className='flex items-center gap-1.5 text-base-color'
        onClick={() => router.push('/')}
      >
        <Lightbulb size={24} />
        <span className='text-lg font-semibold'>nova</span>
      </button>

      {isHome && (
        <TextInput
          size='lg'
          value={keyword}
          onChange={setKeyword}
          icon={Search}
          placeholder='아티클 및 트렌드를 검색해보세요'
          className='w-100'
        />
      )}
    </header>
  );
};

export default HeaderBar;
