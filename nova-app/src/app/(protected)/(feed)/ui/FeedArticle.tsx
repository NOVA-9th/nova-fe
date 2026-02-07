'use client';

import { ArticleCard } from '@/shared/ui';
import ArticleCardSkeleton from './FeedArticleSkeleton';
import FeedArticleError from './FeedArticleError';
import { useFeedArticles } from '@/features/feed/hooks/useFeedArticles';

const FeedArticle = () => {
  const { articles, isLoading, isError, refetch } = useFeedArticles();

  if (isLoading)
    return (
      <section className='space-y-4'>
        {Array.from({ length: 5 }).map((_, idx) => (
          <ArticleCardSkeleton key={idx} />
        ))}
      </section>
    );

  if (isError)
    return (
      <section className='space-y-4'>
        <FeedArticleError onRetry={refetch} />
      </section>
    );

  return (
    <section className='space-y-4'>
      {articles.map((article) => (
        <ArticleCard key={article.id} articleData={article} />
      ))}
    </section>
  );
};

export default FeedArticle;
