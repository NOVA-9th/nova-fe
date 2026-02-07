'use client';

import { getFeedList } from '@/features/feed/api/feed';
import { ArticleCard } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { useFeedFilterStore } from '@/features/feed/model/useFeedFilterStore';
import type { FeedSearchRequest } from '@/features/feed/types/api';
import { useMemo } from 'react';
import ArticleCardSkeleton from './FeedArticleSkeleton';
import FeedArticleError from './FeedArticleError';

const ALL_TYPES: FeedSearchRequest['type'] = ['NEWS', 'JOB', 'COMMUNITY'];

const sortToApi = (ui: string): FeedSearchRequest['sort'] =>
  ui === '최신순' ? 'LATEST' : 'RELEVANCE';

const periodToDays = (ui: string) => {
  if (ui === '1일') return 1;
  if (ui === '7일') return 7;
  return 30;
};

const FeedArticle = () => {
  const { selectedSort, selectedPeriod, selectedTypes, selectedKeywords } = useFeedFilterStore();

  // 메모이제이션으로 무한 호출 방지
  const params = useMemo<FeedSearchRequest>(() => {
    const endDate = new Date();
    const days = periodToDays(selectedPeriod);
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - days);

    return {
      sort: sortToApi(selectedSort),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      type: selectedTypes.length === 0 ? ALL_TYPES : selectedTypes,
      keywords: selectedKeywords,
      page: 1,
      size: 10,
      saved: false,
    };
  }, [selectedSort, selectedPeriod, selectedTypes, selectedKeywords]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['feedList', params],
    queryFn: () => getFeedList(params),
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    retry: 3,
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

  const feedArticle = data?.data?.cardnews ?? [];

  return (
    <section className='space-y-4'>
      {feedArticle.map((article) => (
        <ArticleCard key={article.id} articleData={article} />
      ))}
    </section>
  );
};

export default FeedArticle;
