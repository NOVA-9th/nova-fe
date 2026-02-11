'use client';

import { useQuery } from '@tanstack/react-query';
import { getMemberKeywords } from '@/shared/api/keywords';

export const useMemberKeywordsQuery = (memberId: number | null) => {
  return useQuery({
    queryKey: ['memberKeywords', memberId],
    queryFn: () => getMemberKeywords(memberId!), // enabled로 memberId 보장
    enabled: typeof memberId === 'number' && memberId > 0,
    select: (res) => res.data,
  });
};
