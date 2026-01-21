'use client';

import { ChipInput, SwitchInput, TextInput } from '@/shared/ui';
import { SquareDashed } from 'lucide-react';
import { useState } from 'react';

const InputTestPage = () => {
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
            icon={SquareDashed}
            className='h-9 w-90'
          />
          <TextInput
            variant='surface'
            size='md'
            data={false}
            value={value}
            onChange={setValue}
            placeholder='Placeholder'
            icon={SquareDashed}
            className='h-9 w-90'
          />
          <TextInput
            variant='outline'
            size='md'
            data={true}
            value={value}
            onChange={setValue}
            placeholder='Placeholder'
            icon={SquareDashed}
            className='h-9 w-90'
          />
          <TextInput
            variant='surface'
            size='md'
            data={true}
            value={value}
            onChange={setValue}
            placeholder='Placeholder'
            icon={SquareDashed}
            className='h-9 w-90'
          />
          <TextInput
            variant='outline'
            size='lg'
            data={false}
            value={value}
            onChange={setValue}
            placeholder='Placeholder'
            icon={SquareDashed}
            className='h-11 w-90'
          />
          <TextInput
            variant='surface'
            size='lg'
            data={false}
            value={value}
            onChange={setValue}
            placeholder='Placeholder'
            icon={SquareDashed}
            className='h-11 w-90'
          />
          <TextInput
            variant='outline'
            size='lg'
            data={true}
            value={value}
            onChange={setValue}
            placeholder='Placeholder'
            icon={SquareDashed}
            className='h-11 w-90'
          />
          <TextInput
            variant='surface'
            size='lg'
            data={true}
            value={value}
            onChange={setValue}
            placeholder='Placeholder'
            icon={SquareDashed}
            className='h-11 w-90'
          />
          <ChipInput
            variant='outline'
            size='md'
            data={false}
            placeholder='Placeholder'
            icon={SquareDashed}
            className='h-9 w-90'
          />
          <ChipInput
            variant='surface'
            size='md'
            data={false}
            placeholder='Placeholder'
            icon={SquareDashed}
            className='h-9 w-90'
          />
          <ChipInput
            variant='outline'
            size='md'
            data={true}
            placeholder='Placeholder'
            icon={SquareDashed}
            className='h-9 w-90'
          />
          <ChipInput
            variant='surface'
            size='md'
            data={true}
            placeholder='Placeholder'
            icon={SquareDashed}
            className='h-9 w-90'
          />
          <ChipInput
            variant='outline'
            size='lg'
            data={false}
            placeholder='Placeholder'
            icon={SquareDashed}
            className='h-11 w-90'
          />
          <ChipInput
            variant='surface'
            size='lg'
            data={false}
            placeholder='Placeholder'
            icon={SquareDashed}
            className='h-11 w-90'
          />
          <ChipInput
            variant='outline'
            size='lg'
            data={true}
            placeholder='Placeholder'
            icon={SquareDashed}
            className='h-11 w-90'
          />
          <ChipInput
            variant='surface'
            size='lg'
            data={true}
            placeholder='Placeholder'
            icon={SquareDashed}
            className='h-11 w-90'
          />
        </div>
        <div className='flex items-center justify-center gap-10'>
          <SwitchInput size='lg' label='Label' />
          <SwitchInput size='md' label='Label' />
          <SwitchInput size='sm' label='Label' />
        </div>
      </div>
    </div>
  );
};

export default InputTestPage;
