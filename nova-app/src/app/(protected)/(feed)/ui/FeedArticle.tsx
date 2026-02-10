'use client';

import { ArticleCard } from '@/shared/ui';
import ArticleCardSkeleton from './FeedArticleSkeleton';
import FeedArticleError from './FeedArticleError';
import EmptyFeed from './EmptyFeed';
import { useInfiniteFeedArticles } from '@/features/feed/hooks/useInfiniteFeedArticles';
import { useInfiniteScroll } from '@/shared/hooks';

const FeedArticle = () => {
  const {
    articles,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteFeedArticles();

  const { targetRef } = useInfiniteScroll({
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    fetchNextPage,
    throttleMs: 500,
  });

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

  if (!articles || articles.length === 0)
    return (
      <section className='space-y-4'>
        <EmptyFeed />
      </section>
    );

  return (
    <>
      <section className='space-y-4'>
        {articles.map((article) => (
          <ArticleCard key={article.id} articleData={article} />
        ))}
        {isFetchingNextPage && (
          <div className='space-y-4'>
            {Array.from({ length: 1 }).map((_, idx) => (
              <ArticleCardSkeleton key={`loading-${idx}`} />
            ))}
          </div>
        )}
        {!hasNextPage && !isFetchingNextPage && articles.length > 0 && (
          <div className='flex justify-center items-center py-8'>
            <p className='typo-body-base text-additive'>
              더 이상 피드 콘텐츠가 없습니다.
            </p>
          </div>
        )}
      </section>
      <div ref={targetRef} className='' />
    </>
  );
};

export default FeedArticle;
