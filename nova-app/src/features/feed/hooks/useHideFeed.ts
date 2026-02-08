'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postHiddenFeed } from '@/features/feed/api/feed';
import { showToast } from '@/shared/utils/toast';

export const useHideFeed = (cardNewsId: number) => {
  const queryClient = useQueryClient();

  const hideFeedMutation = useMutation({
    mutationFn: () => postHiddenFeed(cardNewsId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedList'] });
      showToast.success('피드가 숨김 처리되었습니다.');
    },
    onError: () => {
      showToast.error('숨김 처리에 실패했습니다.');
    },
  });

  return {
    handleHideFeed: () => hideFeedMutation.mutate(),
  };
};
