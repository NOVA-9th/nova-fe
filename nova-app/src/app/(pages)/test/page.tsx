import { Button } from '@/shared/ui/action/button/Button';
import { IconBtn } from '@/shared/ui/action/icon_button/IconBtn';
import { TextBtn } from '@/shared/ui/action/text_button/TextBtn';
import { ContentIcon } from '@/shared/ui/icon/Content';
const testPage = () => {
  return (
    <div className='bg-base flex min-h-dvh flex-col items-center justify-center gap-5 rounded-md px-4 text-xl'>
      안녕하세요
      <Button label='label' size={'sm'} peak={true} style={'surface'} />
      <Button label='label' size={'md'} peak={false} style={'data'} />
      <Button label='label' size={'lg'} peak={true} style={'accent'} />
      <Button label='label' size={'lg'} peak={true} style={'outline'} />
      <Button label='label' size={'lg'} peak={false} style={'outline'} />
      <TextBtn label='label' style={'data'} />
      <button className=' p-padding-regular bg-surface rounded-interactive-default'>
        <ContentIcon className='size-5' />
      </button>
      <IconBtn size={'sm'} style={'surface'} peak={true} />
      <IconBtn size={'sm'} style={'surface'} peak={false} />
      <IconBtn size={'sm'} style={'outline'} peak={true} />
      <IconBtn size={'sm'} style={'outline'} peak={false} />
      <IconBtn size={'sm'} style={'surface'} peak={false} />
      <IconBtn size={'sm'} style={'accent'} peak={false} />
      <IconBtn size={'sm'} style={'accent'} peak={true} />
      <IconBtn size={'sm'} style={'accent'} peak={false} />
      <IconBtn size={'sm'} style={'data'} peak={true} />
      <IconBtn size={'sm'} style={'data'} peak={false} />
    </div>
  );
};

export default testPage;
