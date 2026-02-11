'use client';

import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getFeedList } from '@/features/feed/api/feed';
import { useSavedFilterStore } from '@/features/saved/model/useSavedFilterStore';
import type { FeedSearchRequest } from '@/features/feed/types/api';

const ALL_TYPES: FeedSearchRequest['type'] = [];

const sortToApi = (ui: string): FeedSearchRequest['sort'] =>
  ui === '최신순' ? 'LATEST' : 'RELEVANCE';

export const useInfiniteSavedArticles = () => {
  const { selectedSort, selectedTypes, selectedKeywords } = useSavedFilterStore();

  const baseParams = useMemo(() => {
    const endDate = new Date();
    // 저장함에서는 기간 필터를 사용하지 않으므로 넓은 범위로 설정
    const startDate = new Date('2000-01-01');

    return {
      sort: sortToApi(selectedSort),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      type: selectedTypes.length === 0 ? ALL_TYPES : selectedTypes,
      keywords: selectedKeywords,
      size: 10,
      saved: true, // 저장함이므로 항상 true
    };
  }, [selectedSort, selectedTypes, selectedKeywords]);

  const query = useInfiniteQuery({
    queryKey: ['savedList', baseParams],
    queryFn: ({ pageParam = 1 }) => getFeedList({ ...baseParams, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.data?.totalCount ?? 0;
      const loadedCount = allPages.reduce(
        (sum, page) => sum + (page.data?.cardnews?.length ?? 0),
        0,
      );
      return loadedCount < total ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

  const pages = query.data?.pages ?? [];
  const articles = useMemo(() => {
    const allArticles = pages.flatMap((page) => page.data?.cardnews ?? []);
    // ID 기준 중복 제거 (백엔드 페이지네이션 이슈 방어)
    const uniqueMap = new Map(allArticles.map((article) => [article.id, article]));
    return Array.from(uniqueMap.values());
  }, [pages]);

  return {
    ...query,
    baseParams,
    articles,
  };
};
