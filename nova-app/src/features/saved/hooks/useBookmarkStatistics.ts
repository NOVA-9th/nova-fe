'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getBookmarkCountsByInterest,
  getBookmarkCountsBySourceType,
} from '@/features/saved/api/bookmark';

// 관심사별 북마크 개수 조회 Hook
export const useBookmarkCountsByInterest = () => {
  return useQuery({
    queryKey: ['bookmarkCountsByInterest'],
    queryFn: getBookmarkCountsByInterest,
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh
    gcTime: 1000 * 60 * 30, // 30분 동안 캐시 유지
  });
};

// 출처별 북마크 개수 조회 Hook
export const useBookmarkCountsBySourceType = () => {
  return useQuery({
    queryKey: ['bookmarkCountsBySourceType'],
    queryFn: getBookmarkCountsBySourceType,
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh
    gcTime: 1000 * 60 * 30, // 30분 동안 캐시 유지
  });
};
