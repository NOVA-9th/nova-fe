import { PageHeader } from '@/shared/ui';
import { MessagesSquare } from 'lucide-react';
import { FeedFilterSidebar, FeedArticle, FeedMobileFilter } from './ui';

const FeedPage = () => {
  return (
    <>
      <PageHeader text='피드' icon={MessagesSquare} />
      <div className='flex gap-4 md:px-5 px-4 pb-5'>
        <div className='flex-1 min-w-0 space-y-4'>
          <FeedMobileFilter />
          <FeedArticle />
        </div>
        <FeedFilterSidebar />
      </div>
    </>
  );
};

export default FeedPage;
