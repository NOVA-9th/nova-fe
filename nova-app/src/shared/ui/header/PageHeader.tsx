import { Breadcrumb } from '@/shared/ui';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  text: string;
  icon: LucideIcon;
}

const PageHeader = ({ text, icon }: PageHeaderProps) => {
  return (
    <header className='p-4'>
      <Breadcrumb items={[text]} depth={1} icon={icon} />
    </header>
  );
};

export default PageHeader;
