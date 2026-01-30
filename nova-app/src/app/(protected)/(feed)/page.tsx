import { PageHeader } from '@/shared/ui';
import { MessagesSquare } from 'lucide-react';
import FeedFilterSidebar from '@/app/(protected)/(feed)/ui/FeedFilterSidebar';
import FeedArticle from '@/app/(protected)/(feed)/ui/FeedArticle';

const FeedPage = () => {
  return (
    <>
      <PageHeader text='피드' icon={MessagesSquare} />
      <div className='flex gap-4 px-5 pb-5'>
        <FeedArticle />
        <FeedFilterSidebar />
      </div>
    </>
  );
};

export default FeedPage;
