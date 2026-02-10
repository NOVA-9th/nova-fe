// features/feed/hooks/useSavedCount.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { getFeedList } from '@/features/feed/api/feed';
import { useAuthStore } from '@/features/login/model/useAuthStore';

export const useSavedCount = () => {
  const { memberId } = useAuthStore();
  return useQuery({
    queryKey: ['savedCount', memberId],
    enabled: !!memberId,
    queryFn: () =>
      getFeedList({
        sort: 'LATEST',
        startDate: '2000-01-01T00:00:00Z',
        endDate: new Date().toISOString(),
        type: [],
        keywords: [],
        page: 1,
        size: 1,
        saved: true,
        hidden: false,
      }),
    select: (res) => res?.data?.totalCount,
    staleTime: 5 * 60 * 1000,
  });
};
