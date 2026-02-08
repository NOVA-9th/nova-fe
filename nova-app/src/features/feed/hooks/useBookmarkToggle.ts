'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBookmark, postBookmark } from '@/features/feed/api/bookmark';
import { showToast } from '@/shared/utils/toast';

export const useBookmarkToggle = (cardnewsId: number, initialSaved: boolean) => {
  const [optimisticSaved, setOptimisticSaved] = useState<boolean | null>(null);
  const queryClient = useQueryClient();

  const createBookmarkMutation = useMutation({
    mutationFn: () => postBookmark(cardnewsId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedList'] });
      setOptimisticSaved(null); // 서버 동기화 시 실제 데이터로 복귀
      showToast.success('북마크가 저장되었습니다');
    },
    onError: () => {
      setOptimisticSaved(null); // 실패 시 실제 데이터로 복귀
      showToast.error('북마크 저장에 실패했습니다');
    },
  });

  const deleteBookmarkMutation = useMutation({
    mutationFn: () => deleteBookmark(cardnewsId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedList'] });
      setOptimisticSaved(null);
      showToast.success('북마크가 삭제되었습니다');
    },
    onError: () => {
      setOptimisticSaved(null);
      showToast.error('북마크 삭제에 실패했습니다');
    },
  });

  const isPending = createBookmarkMutation.isPending || deleteBookmarkMutation.isPending;

  const isPositiveSaved = optimisticSaved !== null ? optimisticSaved : initialSaved;

  const toggle = () => {
    if (isPending) return;

    if (isPositiveSaved) {
      // 현재 UI 기준으로 토글
      setOptimisticSaved(false);
      deleteBookmarkMutation.mutate();
    } else {
      setOptimisticSaved(true);
      createBookmarkMutation.mutate();
    }
  };

  return {
    isPositiveSaved,
    toggle,
  };
};
