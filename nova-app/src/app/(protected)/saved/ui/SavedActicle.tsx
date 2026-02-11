'use client';

import { ArticleCard } from '@/shared/ui';
import ArticleCardSkeleton from '@/app/(protected)/(feed)/ui/FeedArticleSkeleton';
import FeedArticleError from '@/app/(protected)/(feed)/ui/FeedArticleError';
import EmptyFeed from '@/app/(protected)/(feed)/ui/EmptyFeed';
import { useInfiniteSavedArticles } from '@/features/saved/hooks/useInfiniteSavedArticles';
import { useInfiniteScroll } from '@/shared/hooks';

const SavedArticleList = () => {
  const { articles, isLoading, isError, refetch, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteSavedArticles();

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
      <section id='saved-articles-export-root' className='space-y-4'>
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
          <div className='flex justify-center items-center py-2'>
            <p className='typo-body-base text-additive'>더 이상 저장한 콘텐츠가 없습니다.</p>
          </div>
        )}
      </section>
      <div ref={targetRef} className='h-4' />
    </>
  );
};

export default SavedArticleList;
