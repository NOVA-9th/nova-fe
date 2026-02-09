'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFeedList } from '@/features/feed/api/feed';
import { useSavedFilterStore } from '@/features/saved/model/useSavedFilterStore';
import type { FeedSearchRequest } from '@/features/feed/types/api';

const ALL_TYPES: FeedSearchRequest['type'] = [];

const sortToApi = (ui: string): FeedSearchRequest['sort'] =>
  ui === '최신순' ? 'LATEST' : 'RELEVANCE';

export const useSavedArticles = () => {
  const { selectedSort, selectedTypes, selectedKeywords } = useSavedFilterStore();

  const params = useMemo<FeedSearchRequest>(() => {
    const endDate = new Date();
    // 저장함에서는 기간 필터를 사용하지 않으므로 넓은 범위로 설정
    const startDate = new Date('2000-01-01');

    return {
      sort: sortToApi(selectedSort),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      type: selectedTypes.length === 0 ? ALL_TYPES : selectedTypes,
      keywords: selectedKeywords,
      page: 1,
      size: 10,
      saved: true, // 저장함이므로 항상 true
    };
  }, [selectedSort, selectedTypes, selectedKeywords]);

  const query = useQuery({
    queryKey: ['savedList', params],
    queryFn: () => getFeedList(params),
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

  const articles = query.data?.data?.cardnews ?? [];

  const sortedArticles = [...articles].sort((a, b) => {
    const aTime = new Date(a.publishedAt).getTime();
    const bTime = new Date(b.publishedAt).getTime();
    return aTime - bTime;
  });

  return {
    ...query,
    params,
    articles,
    sortedArticles,
  };
};

