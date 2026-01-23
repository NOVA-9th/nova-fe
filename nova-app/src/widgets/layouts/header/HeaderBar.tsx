'use client';

import { TextInput } from '@/shared/ui';
import { Lightbulb, Search } from 'lucide-react';
import { useState } from 'react';

const HeaderBar = () => {
  const [keyword, setKeyword] = useState('');

  return (
    <nav className='p-4 flex justify-between items-center h-19'>
      <button type='button' className='flex items-center gap-1.5 text-base-color'>
        <Lightbulb size={24} />
        <span className='text-lg font-semibold'>nova</span>
      </button>
      <TextInput
        size='lg'
        value={keyword}
        onChange={setKeyword}
        icon={Search}
        placeholder='아티클 및 트렌드를 검색해보세요'
        className='w-100'
      />
    </nav>
  );
};

export default HeaderBar;
