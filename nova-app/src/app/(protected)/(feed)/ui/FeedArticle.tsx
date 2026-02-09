'use client';

import { ArticleCard } from '@/shared/ui';
import ArticleCardSkeleton from './FeedArticleSkeleton';
import FeedArticleError from './FeedArticleError';
import EmptyFeed from './EmptyFeed';
import { useFeedArticles } from '@/features/feed/hooks/useFeedArticles';

const FeedArticle = () => {
  const { sortedArticles, isLoading, isError, refetch } = useFeedArticles();

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

  if (!sortedArticles || sortedArticles.length === 0)
    return (
      <section className='space-y-4'>
        <EmptyFeed />
      </section>
    );

  return (
    <section className='space-y-4'>
      {sortedArticles.map((article) => (
        <ArticleCard key={article.id} articleData={article} />
      ))}
    </section>
  );
};

export default FeedArticle;
