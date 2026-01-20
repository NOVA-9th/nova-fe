import { Button } from '@/shared/ui/action/button/Button';
import GuidanceChip from '@/shared/ui/action/guidance_chip/GuidanceChip';
import { IconBtn } from '@/shared/ui/action/icon_button/IconBtn';
import InputChip from '@/shared/ui/action/input_chip/InputChip';
import { SelectionChipBtn } from '@/shared/ui/action/selection_chip/SelectionChipBtn';
import { TextBtn } from '@/shared/ui/action/text_button/TextBtn';
import ToggleBtn from '@/shared/ui/action/toggle_button/ToggleBtn';
import { SquareDashed } from 'lucide-react';

const InputTestPage = () => {
  return (
    <div className='bg-base flex min-h-dvh items-center justify-center'>
      <div className='flex flex-col gap-10'>
        <div className='grid grid-cols-2 place-items-center gap-5'>
          <InputChip
            size='sm'
            variant='surface'
            icon={SquareDashed}
            text='Label'
            className='h-6 w-19.25'
          />
          <InputChip
            size='sm'
            variant='outline'
            icon={SquareDashed}
            text='Label'
            className='h-6 w-19.25'
          />
          <InputChip
            size='md'
            variant='surface'
            icon={SquareDashed}
            text='Label'
            className='h-8 w-23.25'
          />
          <InputChip
            size='md'
            variant='outline'
            icon={SquareDashed}
            text='Label'
            className='h-8 w-23.25'
          />
        </div>
        <div className='grid grid-cols-3 place-items-center gap-5'>
          <GuidanceChip
            size='sm'
            variant='surface'
            icon={SquareDashed}
            text='Label'
            className='h-6 w-15.25'
          />
          <GuidanceChip
            size='sm'
            variant='outline'
            icon={SquareDashed}
            text='Label'
            className='h-6 w-15.25'
          />
          <GuidanceChip
            size='sm'
            variant='accent'
            icon={SquareDashed}
            text='Label'
            className='h-6 w-15.25'
          />
          <GuidanceChip
            size='md'
            variant='surface'
            icon={SquareDashed}
            text='Label'
            className='h-8 w-18.25'
          />
          <GuidanceChip
            size='md'
            variant='outline'
            icon={SquareDashed}
            text='Label'
            className='h-8 w-18.25'
          />
          <GuidanceChip
            size='md'
            variant='accent'
            icon={SquareDashed}
            text='Label'
            className='h-8 w-18.25'
          />
        </div>
        <div className='grid grid-cols-4 place-items-center gap-5'>
          <ToggleBtn
            size='md'
            variant='surface'
            selected={true}
            icon={SquareDashed}
            text='Label'
            className='h-9 w-19.25'
          />
          <ToggleBtn
            size='md'
            variant='surface'
            selected={false}
            icon={SquareDashed}
            text='Label'
            className='h-9 w-19.25'
          />
          <ToggleBtn
            size='md'
            variant='outline'
            selected={true}
            icon={SquareDashed}
            text='Label'
            className='h-9 w-19.25'
          />
          <ToggleBtn
            size='md'
            variant='outline'
            selected={false}
            icon={SquareDashed}
            text='Label'
            className='h-9 w-19.25'
          />

          <ToggleBtn
            size='lg'
            variant='surface'
            selected={true}
            icon={SquareDashed}
            text='Label'
            className='h-11 w-22'
          />
          <ToggleBtn
            size='lg'
            variant='surface'
            selected={false}
            icon={SquareDashed}
            text='Label'
            className='h-11 w-22'
          />
          <ToggleBtn
            size='lg'
            variant='outline'
            selected={true}
            icon={SquareDashed}
            text='Label'
            className='h-11 w-22'
          />
          <ToggleBtn
            size='lg'
            variant='outline'
            selected={false}
            icon={SquareDashed}
            text='Label'
            className='h-11 w-22'
          />
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
          <SelectionChipBtn
            size={'sm'}
            style={'surface'}
            selected={false}
            icon={<SquareDashed size={12} />}
            label={'label'}
          />
          <SelectionChipBtn
            size={'sm'}
            style={'surface'}
            selected={true}
            icon={<SquareDashed size={12} />}
            label={'label'}
          />
          <SelectionChipBtn
            size={'sm'}
            style={'accent'}
            selected={true}
            icon={<SquareDashed size={12} />}
            label={'label'}
          />
          <SelectionChipBtn
            size={'sm'}
            style={'accent'}
            selected={false}
            icon={<SquareDashed size={12} />}
            label={'label'}
          />
          <SelectionChipBtn
            size={'sm'}
            style={'outline'}
            selected={true}
            icon={<SquareDashed size={12} />}
            label={'label'}
          />
          <SelectionChipBtn
            size={'sm'}
            style={'outline'}
            selected={false}
            icon={<SquareDashed size={12} />}
            label={'label'}
          />
        </div>
      </div>
    </div>
  );
};

export default InputTestPage;
