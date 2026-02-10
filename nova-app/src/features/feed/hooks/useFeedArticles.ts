'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFeedList } from '@/features/feed/api/feed';
import { useFeedFilterStore } from '@/features/feed/model/useFeedFilterStore';
import type { FeedSearchRequest } from '@/features/feed/types/api';

const ALL_TYPES: FeedSearchRequest['type'] = [];

const sortToApi = (ui: string): FeedSearchRequest['sort'] =>
  ui === '최신순' ? 'LATEST' : 'RELEVANCE';

const periodToDays = (ui: string) => {
  if (ui === '1일') return 1;
  if (ui === '7일') return 7;
  return 30;
};

export const useFeedArticles = (saved: boolean = false) => {
  const { selectedSort, selectedPeriod, selectedTypes, selectedKeywords, searchKeyword } =
    useFeedFilterStore();

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
      saved,
      searchKeyword,
      hidden: false,
    };
  }, [selectedPeriod, selectedSort, selectedTypes, selectedKeywords, saved, searchKeyword]);

  const query = useQuery({
    queryKey: ['feedList', params],
    queryFn: () => getFeedList(params),
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const articles = query.data?.data?.cardnews ?? [];

  const sortedArticles = useMemo(() => {
    if (selectedSort === '관련도 순') {
      // score 높은 순(내림차순)
      return [...articles].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    }

    // 최신순: publishedAt 최신이 먼저(내림차순)
    return [...articles].sort(
      (a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime(),
    );
  }, [articles, selectedSort]);

  return {
    ...query,
    params,
    articles,
    sortedArticles,
  };
};
