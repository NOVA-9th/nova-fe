import { mockArticleData } from '@/features/saved/mocks/articleMockData';
import { ArticleCard, PageHeader } from '@/shared/ui';
import { MessagesSquare } from 'lucide-react';

const page = () => {
  return (
    <>
      <PageHeader text='피드' icon={MessagesSquare} />
      <section className='space-y-4 px-5 pb-5'>
        {mockArticleData.map((article) => (
          <ArticleCard key={article.id} articleData={article} />
        ))}
      </section>
    </>
  );
};

export default page;
