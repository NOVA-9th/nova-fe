import { mockArticleData } from '@/features/saved/mocks/articleMockData';
import { ArticleCard } from '@/shared/ui';

const FeedArticle = () => {
  return (
    <section className='space-y-4'>
      {mockArticleData.map((article) => (
        <ArticleCard key={article.id} articleData={article} />
      ))}
    </section>
  );
};

export default FeedArticle;
