import SideTabItem from '@/shared/ui/navigation/SideTabItem';
import { SquareDashed } from 'lucide-react';

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4 min-h-dvh'>
      <SideTabItem label='Label' icon={<SquareDashed size={16} />} />
      <SideTabItem label='Label' icon={<SquareDashed size={16} />} peak={true} />
      <SideTabItem label='Label' icon={<SquareDashed size={16} />} minimized={true} />
      <SideTabItem label='Label' icon={<SquareDashed size={16} />} peak={true} minimized={true} />
    </div>
  );
};

export default page;
