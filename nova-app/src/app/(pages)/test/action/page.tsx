import GuidanceChip from '@/shared/ui/action/guidance_chip/GuidanceChip';
import InputChip from '@/shared/ui/action/input_chip/InputChip';
import ToggleBtn from '@/shared/ui/action/toggle_button/ToggleBtn';
import { SquareDashed } from 'lucide-react';

const page = () => {
  return (
    <div className='bg-base flex min-h-dvh items-center justify-center'>
      <div className='flex flex-col gap-10'>
        <div className='grid grid-cols-2 place-items-center gap-5'>
          <InputChip
            size='sm'
            variant='surface'
            icon={<SquareDashed size={12} />}
            text='Label'
            className='h-6 w-19.25'
          />
          <InputChip
            size='sm'
            variant='outline'
            icon={<SquareDashed size={12} />}
            text='Label'
            className='h-6 w-19.25'
          />
          <InputChip
            size='md'
            variant='surface'
            icon={<SquareDashed size={14} />}
            text='Label'
            className='h-8 w-23.25'
          />
          <InputChip
            size='md'
            variant='outline'
            icon={<SquareDashed size={14} />}
            text='Label'
            className='h-8 w-23.25'
          />
        </div>
        <div className='grid grid-cols-3 place-items-center gap-5'>
          <GuidanceChip
            size='sm'
            variant='surface'
            icon={<SquareDashed size={12} />}
            text='Label'
            className='h-6 w-15.25'
          />
          <GuidanceChip
            size='sm'
            variant='outline'
            icon={<SquareDashed size={12} />}
            text='Label'
            className='h-6 w-15.25'
          />
          <GuidanceChip
            size='sm'
            variant='accent'
            icon={<SquareDashed size={12} />}
            text='Label'
            className='h-6 w-15.25'
          />
          <GuidanceChip
            size='md'
            variant='surface'
            icon={<SquareDashed size={14} />}
            text='Label'
            className='h-8 w-18.25'
          />
          <GuidanceChip
            size='md'
            variant='outline'
            icon={<SquareDashed size={14} />}
            text='Label'
            className='h-8 w-18.25'
          />
          <GuidanceChip
            size='md'
            variant='accent'
            icon={<SquareDashed size={14} />}
            text='Label'
            className='h-8 w-18.25'
          />
        </div>
        <div className='grid grid-cols-4 place-items-center gap-5'>
          <ToggleBtn
            size='md'
            variant='surface'
            selected={true}
            icon={<SquareDashed size={14} />}
            text='Label'
            className='h-9 w-19.25'
          />
          <ToggleBtn
            size='md'
            variant='surface'
            selected={false}
            icon={<SquareDashed size={14} />}
            text='Label'
            className='h-9 w-19.25'
          />
          <ToggleBtn
            size='md'
            variant='outline'
            selected={true}
            icon={<SquareDashed size={14} />}
            text='Label'
            className='h-9 w-19.25'
          />
          <ToggleBtn
            size='md'
            variant='outline'
            selected={false}
            icon={<SquareDashed size={14} />}
            text='Label'
            className='h-9 w-19.25'
          />

          <ToggleBtn
            size='lg'
            variant='surface'
            selected={true}
            icon={<SquareDashed size={16} />}
            text='Label'
            className='h-11 w-22'
          />
          <ToggleBtn
            size='lg'
            variant='surface'
            selected={false}
            icon={<SquareDashed size={16} />}
            text='Label'
            className='h-11 w-22'
          />
          <ToggleBtn
            size='lg'
            variant='outline'
            selected={true}
            icon={<SquareDashed size={16} />}
            text='Label'
            className='h-11 w-22'
          />
          <ToggleBtn
            size='lg'
            variant='outline'
            selected={false}
            icon={<SquareDashed size={16} />}
            text='Label'
            className='h-11 w-22'
          />
        </div>
      </div>
    </div>
  );
};

export default page;
