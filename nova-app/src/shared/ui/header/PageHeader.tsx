import { Breadcrumb } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';
import { LucideIcon } from 'lucide-react';
import { memo } from 'react';

interface PageHeaderProps {
  text: string;
  icon: LucideIcon;
  className?: string;
}

export const PageHeader = memo(({ text, icon, className }: PageHeaderProps) => {
  return (
    <header className={cn('p-4', className)}>
      <Breadcrumb items={[text]} depth={1} icon={icon} />
    </header>
  );
});
