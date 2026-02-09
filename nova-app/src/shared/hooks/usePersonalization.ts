import { getPersonalization } from '@/features/profile/api/profile';
import { useQuery } from '@tanstack/react-query';

/**
 * 개인화 설정 조회
 */
export const usePersonalization = (memberId: number | null) => {
  return useQuery({
    queryKey: ['personalization', memberId],
    queryFn: () => getPersonalization(memberId!),
    enabled: !!memberId && memberId > 0,
  });
};

/**
 * 개인화 설정 수정
 */
