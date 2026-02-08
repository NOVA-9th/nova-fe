import { useQuery } from '@tanstack/react-query';
import { getKeywords } from '@/features/onboarding/api/onboarding';
import { KeywordPersonalizationDto } from '@/features/onboarding/types/api';

export const useGetKeywords = () => {
  return useQuery<KeywordPersonalizationDto>({
    queryKey: ['interestKeywords'],
    queryFn: getKeywords,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
};
