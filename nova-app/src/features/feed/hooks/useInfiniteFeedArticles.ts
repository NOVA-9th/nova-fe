'use client';

import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
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

export const useInfiniteFeedArticles = () => {
  const { selectedSort, selectedPeriod, selectedTypes, selectedKeywords, searchKeyword } =
    useFeedFilterStore();

  const baseParams = useMemo(() => {
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
      size: 10,
      searchKeyword,
      saved: false, // 피드이므로 false
      hidden: false,
    };
  }, [selectedPeriod, selectedSort, selectedTypes, selectedKeywords, searchKeyword]);

  const query = useInfiniteQuery({
    queryKey: ['feedList', baseParams],
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
    staleTime: 3 * 60 * 1000, // 피드는 저장함보다 짧게 (3분)
    retry: 3,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pages = query.data?.pages ?? [];

  const articles = useMemo(() => {
    const allArticles = pages.flatMap((page) => page.data?.cardnews ?? []);

    // ID 기준 중복 제거 (백엔드 페이지네이션 이슈 방어)
    const uniqueMap = new Map(allArticles.map((article) => [article.id, article]));
    const uniqueArticles = Array.from(uniqueMap.values());

    // 관련도 순 정렬 (내림차순)
    if (selectedSort === '관련도 순') {
      return uniqueArticles.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    }

    // 기본은 최신순 정렬 (오름차순)
    return uniqueArticles.sort(
      (a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime(),
    );
  }, [pages, selectedSort]);

  return {
    ...query,
    baseParams,
    articles,
  };
};
