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

export const useFeedArticles = () => {
  const { selectedSort, selectedPeriod, selectedTypes, selectedKeywords } = useFeedFilterStore();

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

  const query = useQuery({
    queryKey: ['feedList', params],
    queryFn: () => getFeedList(params),
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

  const articles = query.data?.data?.cardnews ?? [];

  return {
    ...query,
    params,
    articles,
  };
};
