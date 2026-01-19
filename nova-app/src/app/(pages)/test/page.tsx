import { Button } from '@/shared/ui/action/button/Button';
import { IconBtn } from '@/shared/ui/action/icon_button/IconBtn';
import { TextBtn } from '@/shared/ui/action/text_button/TextBtn';
import { SquareDashed } from 'lucide-react';

const testPage = () => {
  return (
    <div className='bg-base flex min-h-dvh flex-col items-center justify-center gap-5 rounded-md px-4 text-xl'>
      안녕하세요
      <Button label='label' size={'sm'} peak={true} style={'surface'} />
      <Button label='label' size={'sm'} peak={false} style={'surface'} />
      <Button label='label' size={'md'} peak={false} style={'data'} />
      <Button label='label' size={'lg'} peak={true} style={'accent'} />
      <Button label='label' size={'lg'} peak={true} style={'outline'} />
      <Button label='label' size={'lg'} peak={false} style={'outline'} />
      <TextBtn
        label='label'
        style={'data'}
        size={'lg'}
        leftIcon={<SquareDashed size={12} />}
        rightIcon={<SquareDashed size={12} />}
      />
      <TextBtn
        label='label'
        style={'accent'}
        size={'sm'}
        leftIcon={<SquareDashed size={12} />}
        rightIcon={<SquareDashed size={12} />}
      />
      <TextBtn
        label='label'
        style={'surface'}
        size={'md'}
        leftIcon={<SquareDashed size={12} />}
        rightIcon={<SquareDashed size={12} />}
      />
      <TextBtn label='label' style={'data'} />
      <IconBtn size={'sm'} style={'surface'} peak={true} icon={<SquareDashed size={12} />} />
      <IconBtn size={'sm'} style={'surface'} peak={false} icon={<SquareDashed size={12} />} />
      <IconBtn size={'sm'} style={'outline'} peak={true} icon={<SquareDashed size={12} />} />
      <IconBtn size={'sm'} style={'outline'} peak={false} icon={<SquareDashed size={12} />} />
      <IconBtn size={'sm'} style={'surface'} peak={false} icon={<SquareDashed size={12} />} />
      <IconBtn size={'sm'} style={'accent'} peak={false} icon={<SquareDashed size={12} />} />
      <IconBtn size={'sm'} style={'accent'} peak={true} icon={<SquareDashed size={12} />} />
      <IconBtn size={'sm'} style={'accent'} peak={false} icon={<SquareDashed size={12} />} />
      <IconBtn size={'sm'} style={'data'} peak={true} icon={<SquareDashed size={12} />} />
      <IconBtn size={'sm'} style={'data'} peak={false} icon={<SquareDashed size={12} />} />
    </div>
  );
};

export default testPage;
