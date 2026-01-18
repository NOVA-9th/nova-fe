import InputChipBtn from '@/shared/ui/action/InputBtn';
import ToggleBtn from '@/shared/ui/action/ToggleBtn';
import { SquareDashed } from 'lucide-react';

const testPage = () => {
  return (
    <div className='bg-base flex min-h-dvh items-center justify-center px-4'>
      <div className='flex flex-col gap-10'>
        {/* Toggle 버튼 영역 (4개씩) */}
        <div className='grid grid-cols-4 gap-5 text-xl'>
          <ToggleBtn
            size='md'
            variant='surface'
            selected={true}
            icon={<SquareDashed size={14} />}
            text='Label'
            className='h-9 w-[77px]'
          />
          <ToggleBtn
            size='md'
            variant='surface'
            selected={false}
            icon={<SquareDashed size={14} />}
            text='Label'
            className='h-9 w-[77px]'
          />
          <ToggleBtn
            size='md'
            variant='outline'
            selected={true}
            icon={<SquareDashed size={14} />}
            text='Label'
            className='h-9 w-[77px]'
          />
          <ToggleBtn
            size='md'
            variant='outline'
            selected={false}
            icon={<SquareDashed size={14} />}
            text='Label'
            className='h-9 w-[77px]'
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

export default testPage;
