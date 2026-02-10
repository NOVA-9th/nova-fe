import { getKeywordTop } from '@/features/trend/api/trend';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetKeywordTop = () => {
  return useSuspenseQuery({
    queryKey: ['keywords'],
    queryFn: getKeywordTop,
    select: (res) => res.data,
  });
};
