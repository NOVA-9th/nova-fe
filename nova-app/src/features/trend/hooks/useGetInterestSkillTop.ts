import { getInterestSkillTop } from '@/features/trend/api/trend';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetInterestSkillTop = () => {
  return useSuspenseQuery({
    queryKey: ['interests'],
    queryFn: getInterestSkillTop,
    select: (res) => res.data,
  });
};
