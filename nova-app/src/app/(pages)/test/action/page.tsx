import {
  Button,
  GuidanceChip,
  IconButton,
  InputChip,
  SelectionChipButton,
  TextButton,
  ToggleButton,
} from '@/shared/ui';
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
          <ToggleButton
            size='md'
            variant='surface'
            selected={true}
            icon={SquareDashed}
            text='Label'
            className='h-9 w-19.25'
          />
          <ToggleButton
            size='md'
            variant='surface'
            selected={false}
            icon={SquareDashed}
            text='Label'
            className='h-9 w-19.25'
          />
          <ToggleButton
            size='md'
            variant='outline'
            selected={true}
            icon={SquareDashed}
            text='Label'
            className='h-9 w-19.25'
          />
          <ToggleButton
            size='md'
            variant='outline'
            selected={false}
            icon={SquareDashed}
            text='Label'
            className='h-9 w-19.25'
          />

          <ToggleButton
            size='lg'
            variant='surface'
            selected={true}
            icon={SquareDashed}
            text='Label'
            className='h-11 w-22'
          />
          <ToggleButton
            size='lg'
            variant='surface'
            selected={false}
            icon={SquareDashed}
            text='Label'
            className='h-11 w-22'
          />
          <ToggleButton
            size='lg'
            variant='outline'
            selected={true}
            icon={SquareDashed}
            text='Label'
            className='h-11 w-22'
          />
          <ToggleButton
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
          <TextButton
            label='label'
            style={'data'}
            size={'lg'}
            leftIcon={<SquareDashed size={12} />}
            rightIcon={<SquareDashed size={12} />}
          />
          <TextButton
            label='label'
            style={'accent'}
            size={'sm'}
            leftIcon={<SquareDashed size={12} />}
            rightIcon={<SquareDashed size={12} />}
          />
          <TextButton
            label='label'
            style={'surface'}
            size={'md'}
            leftIcon={<SquareDashed size={12} />}
            rightIcon={<SquareDashed size={12} />}
          />
          <TextButton label='label' style={'data'} />
          <IconButton size={'sm'} style={'surface'} peak={true} icon={<SquareDashed size={12} />} />
          <IconButton
            size={'sm'}
            style={'surface'}
            peak={false}
            icon={<SquareDashed size={12} />}
          />
          <IconButton size={'sm'} style={'outline'} peak={true} icon={<SquareDashed size={12} />} />
          <IconButton
            size={'sm'}
            style={'outline'}
            peak={false}
            icon={<SquareDashed size={12} />}
          />
          <IconButton
            size={'sm'}
            style={'surface'}
            peak={false}
            icon={<SquareDashed size={12} />}
          />
          <IconButton size={'sm'} style={'accent'} peak={false} icon={<SquareDashed size={12} />} />
          <IconButton size={'sm'} style={'accent'} peak={true} icon={<SquareDashed size={12} />} />
          <IconButton size={'sm'} style={'accent'} peak={false} icon={<SquareDashed size={12} />} />
          <IconButton size={'sm'} style={'data'} peak={true} icon={<SquareDashed size={12} />} />
          <IconButton size={'sm'} style={'data'} peak={false} icon={<SquareDashed size={12} />} />
          <SelectionChipButton
            size={'sm'}
            style={'surface'}
            selected={false}
            icon={<SquareDashed size={12} />}
            label={'label'}
          />
          <SelectionChipButton
            size={'sm'}
            style={'surface'}
            selected={true}
            icon={<SquareDashed size={12} />}
            label={'label'}
          />
          <SelectionChipButton
            size={'sm'}
            style={'accent'}
            selected={true}
            icon={<SquareDashed size={12} />}
            label={'label'}
          />
          <SelectionChipButton
            size={'sm'}
            style={'accent'}
            selected={false}
            icon={<SquareDashed size={12} />}
            label={'label'}
          />
          <SelectionChipButton
            size={'sm'}
            style={'outline'}
            selected={true}
            icon={<SquareDashed size={12} />}
            label={'label'}
          />
          <SelectionChipButton
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
