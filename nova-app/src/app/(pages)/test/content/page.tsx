import {
  DotBadge,
  Header,
  IconBadge,
  ItemList,
  NumberBadge,
  SectionHeader,
  TextBadge,
} from '@/shared/ui';
import { SquareDashed } from 'lucide-react';

const testPage = () => {
  return (
    <div className='flex min-h-dvh flex-col items-center justify-center gap-5 rounded-interactive-default px-4 text-xl bg-base'>
      <TextBadge size='sm' variant='surface' peak={true} icon={SquareDashed} text='Label' />
      <TextBadge size='sm' variant='surface' peak={false} icon={SquareDashed} text='TextBadge' />
      <TextBadge size='sm' variant='outline' peak={true} icon={SquareDashed} text='TextBadge' />
      <TextBadge size='sm' variant='outline' peak={false} icon={SquareDashed} text='TextBadge' />
      <TextBadge size='sm' variant='accent' peak={true} icon={SquareDashed} text='TextBadge' />
      <TextBadge size='sm' variant='accent' peak={false} icon={SquareDashed} text='TextBadge' />
      <TextBadge size='sm' variant='data' peak={true} icon={SquareDashed} text='TextBadge' />
      <TextBadge size='sm' variant='data' peak={false} icon={SquareDashed} text='TextBadge' />

      <NumberBadge size='sm' variant='surface' peak={true} number={10} />
      <NumberBadge size='sm' variant='surface' peak={false} number={1} />
      <NumberBadge size='sm' variant='outline' peak={true} number={1} />
      <NumberBadge size='sm' variant='outline' peak={false} number={1} />
      <NumberBadge size='sm' variant='accent' peak={true} number={1} />
      <NumberBadge size='sm' variant='accent' peak={false} number={1} />
      <NumberBadge size='sm' variant='data' peak={true} number={1} />
      <NumberBadge size='sm' variant='data' peak={false} number={1} />

      <IconBadge size='sm' variant='surface' peak={true} icon={SquareDashed} />
      <IconBadge size='md' variant='surface' peak={false} icon={SquareDashed} />
      <IconBadge size='md' variant='outline' peak={true} icon={SquareDashed} />
      <IconBadge size='md' variant='outline' peak={false} icon={SquareDashed} />
      <IconBadge size='md' variant='accent' peak={true} icon={SquareDashed} />
      <IconBadge size='lg' variant='accent' peak={false} icon={SquareDashed} />
      <IconBadge size='lg' variant='data' peak={true} icon={SquareDashed} />
      <IconBadge size='lg' variant='data' peak={false} icon={SquareDashed} />

      <DotBadge size='sm' variant='surface' />
      <DotBadge size='sm' variant='accent' />
      <DotBadge size='sm' variant='data' />
      <DotBadge size='md' variant='surface' />
      <DotBadge size='md' variant='accent' />
      <DotBadge size='md' variant='data' />
      <DotBadge size='lg' variant='surface' />
      <DotBadge size='lg' variant='accent' />
      <DotBadge size='lg' variant='data' />

      <SectionHeader
        size='sm'
        peak={true}
        leftIcon={SquareDashed}
        rightIcon={SquareDashed}
        text='SectionHeader'
      />
      <SectionHeader
        size='sm'
        peak={false}
        leftIcon={SquareDashed}
        rightIcon={SquareDashed}
        text='SectionHeader'
      />
      <SectionHeader size='md' peak={true} rightIcon={SquareDashed} text='SectionHeader' />
      <SectionHeader size='md' peak={false} rightIcon={SquareDashed} text='SectionHeader' />
      <SectionHeader size='lg' peak={true} rightIcon={SquareDashed} text='SectionHeader' />
      <SectionHeader size='lg' peak={false} rightIcon={SquareDashed} text='SectionHeader' />

      <ItemList
        size='md'
        label='ItemList'
        description='Description'
        leftIcon={SquareDashed}
      />
      <ItemList
        size='md'
        label='ItemList'
        description='Description'
        leftIcon={SquareDashed}
      />
      <ItemList
        size='lg'
        label='ItemList'
        description='Description'
        leftIcon={SquareDashed}
      />
      <ItemList
        size='lg'
        label='ItemList'
        description='Description'
        leftIcon={SquareDashed}
      />

      <Header size='md' subLabel='SubLabel' label='Header' description='Description' />
      <Header size='lg' subLabel='SubLabel' label='Header' description='Description' />
    </div>
  );
};

export default testPage;
