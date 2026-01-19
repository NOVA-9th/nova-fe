'use client';

import TextInput from '@/shared/ui/input/text_input/TextInput';
import { SquareDashed } from 'lucide-react';
import { useState } from 'react';

const page = () => {
  const [value, setValue] = useState('');

  return (
    <div className='bg-base flex min-h-dvh items-center justify-center'>
      <div className='flex flex-col gap-10'>
        <div className='grid grid-cols-4 place-items-center gap-5'>
          <TextInput
            variant='outline'
            size='md'
            data={false}
            value={value}
            onChange={setValue}
            placeholder='Placeholder'
            icon={<SquareDashed size={14} />}
            className='h-9 w-90'
          />
          <TextInput
            variant='surface'
            size='md'
            data={false}
            value={value}
            onChange={setValue}
            placeholder='Placeholder'
            icon={<SquareDashed size={14} />}
            className='h-9 w-90'
          />
          <TextInput
            variant='outline'
            size='md'
            data={true}
            value={value}
            onChange={setValue}
            placeholder='Placeholder'
            icon={<SquareDashed size={14} />}
            className='h-9 w-90'
          />
          <TextInput
            variant='surface'
            size='md'
            data={true}
            value={value}
            onChange={setValue}
            placeholder='Placeholder'
            icon={<SquareDashed size={14} />}
            className='h-9 w-90'
          />
          <TextInput
            variant='outline'
            size='lg'
            data={false}
            value={value}
            onChange={setValue}
            placeholder='Placeholder'
            icon={<SquareDashed size={16} />}
            className='h-11 w-90'
          />
          <TextInput
            variant='surface'
            size='lg'
            data={false}
            value={value}
            onChange={setValue}
            placeholder='Placeholder'
            icon={<SquareDashed size={16} />}
            className='h-11 w-90'
          />
          <TextInput
            variant='outline'
            size='lg'
            data={true}
            value={value}
            onChange={setValue}
            placeholder='Placeholder'
            icon={<SquareDashed size={16} />}
            className='h-11 w-90'
          />
          <TextInput
            variant='surface'
            size='lg'
            data={true}
            value={value}
            onChange={setValue}
            placeholder='Placeholder'
            icon={<SquareDashed size={16} />}
            className='h-11 w-90'
          />
        </div>
      </div>
    </div>
  );
};

export default page;
