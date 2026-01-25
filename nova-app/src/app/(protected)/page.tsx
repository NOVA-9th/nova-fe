import { Breadcrumb } from '@/shared/ui';
import { MessagesSquare } from 'lucide-react';

const page = () => {
  return (
    <div>
      <Breadcrumb items={['피드']} depth={1} icon={MessagesSquare} />
    </div>
  );
};

export default page;
