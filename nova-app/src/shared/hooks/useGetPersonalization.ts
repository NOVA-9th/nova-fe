import { useQuery } from '@tanstack/react-query';
import { getPersonalization } from '@/features/onboarding/api/onboarding';
import { MemberPersonalizationDto } from '@/features/onboarding/types/api';

export const usePersonalization = (memberId: number) => {
  return useQuery<MemberPersonalizationDto | null>({
    queryKey: [memberId, 'background'],
    queryFn: () => getPersonalization(memberId),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    enabled: !!memberId,
  });
};
