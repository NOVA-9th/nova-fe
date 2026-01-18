import ToggleBtn from '@/shared/ui/action/ToggleBtn';
import { SquareDashed } from 'lucide-react';

const testPage = () => {
  return (
    <div className='bg-base flex min-h-dvh items-center justify-center px-4'>
      <div className='grid grid-cols-4 gap-5 text-xl'>
        <ToggleBtn
          size='md'
          variant='surface'
          selected={true}
          icon={<SquareDashed size={11.375} />}
          text='Label'
        />
        <ToggleBtn
          size='md'
          variant='surface'
          selected={false}
          icon={<SquareDashed size={11.375} />}
          text='Label'
        />
        <ToggleBtn
          size='md'
          variant='outline'
          selected={true}
          icon={<SquareDashed size={11.375} />}
          text='Label'
        />
        <ToggleBtn
          size='md'
          variant='outline'
          selected={false}
          icon={<SquareDashed size={11.375} />}
          text='Label'
        />

        <ToggleBtn
          size='lg'
          variant='surface'
          selected={true}
          icon={<SquareDashed size={13} />}
          text='Label'
        />
        <ToggleBtn
          size='lg'
          variant='surface'
          selected={false}
          icon={<SquareDashed size={13} />}
          text='Label'
        />
        <ToggleBtn
          size='lg'
          variant='outline'
          selected={true}
          icon={<SquareDashed size={13} />}
          text='Label'
        />
        <ToggleBtn
          size='lg'
          variant='outline'
          selected={false}
          icon={<SquareDashed size={13} />}
          text='Label'
        />
      </div>
    </div>
  );
};

export default testPage;
