'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postHiddenFeed } from '@/features/feed/api/feed';
import { deleteBookmark } from '@/features/feed/api/bookmark';
import { showToast } from '@/shared/utils/toast';

export const useHideFeed = (cardNewsId: number, options?: { shouldUnbookmark?: () => boolean }) => {
  const queryClient = useQueryClient();

  const unbookmarkMutation = useMutation({
    mutationFn: () => deleteBookmark(cardNewsId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedCount'] });
      queryClient.invalidateQueries({ queryKey: ['savedList'] });
    },
  });

  const hideFeedMutation = useMutation({
    mutationFn: () => postHiddenFeed(cardNewsId),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['feedList'] });

      const shouldUnbookmark = options?.shouldUnbookmark?.() ?? false;
      if (shouldUnbookmark) {
        unbookmarkMutation.mutate(); // 북마크 취소와 같이 호출
      }

      showToast.success('피드가 숨김 처리되었습니다.');
    },
    onError: () => {
      showToast.error('숨김 처리에 실패했습니다.');
    },
  });

  return {
    handleHideFeed: () => hideFeedMutation.mutate(),
    isPending: hideFeedMutation.isPending || unbookmarkMutation.isPending,
  };
};
