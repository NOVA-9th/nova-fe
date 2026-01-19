import Breadcrumb from '@/shared/ui/navigation/Breadcrumb/Breadcrumb';
import SideTabItem from '@/shared/ui/navigation/SideTabItem/SideTabItem';
import { SquareDashed } from 'lucide-react';

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-10 min-h-dvh'>
      <div className='flex gap-6'>
        <SideTabItem label='Label' icon={<SquareDashed size={16} />} className='w-60 h-11' />
        <SideTabItem
          label='Label'
          icon={<SquareDashed size={16} />}
          peak={true}
          className='w-60 h-11'
        />
        <SideTabItem
          label='Label'
          icon={<SquareDashed size={16} />}
          minimized={true}
          className='w-17 h-17.5'
        />
        <SideTabItem
          label='Label'
          icon={<SquareDashed size={16} />}
          peak={true}
          minimized={true}
          className='w-17 h-17.5'
        />
      </div>
      <div className='flex flex-col gap-4'>
        <Breadcrumb items={['Depth 1']} depth={1} />
        <Breadcrumb items={['Depth 1', 'Depth 2']} depth={2} />
        <Breadcrumb items={['Depth 1', 'Depth 2', 'Depth 3']} depth={3} />
        <Breadcrumb items={['Depth 1', 'Depth 2', 'Depth 3', 'Depth 4']} depth={4} />
      </div>
    </div>
  );
};

export default page;
