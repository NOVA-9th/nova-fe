'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

interface UseInfiniteScrollOptions {
  /** 추가 페이지가 더 있는지 여부 */
  hasNextPage?: boolean;
  /** 현재 추가 페이지를 가져오는 중인지 여부 */
  isFetchingNextPage?: boolean;
  /** 다음 페이지를 가져오는 함수 (React Query 의 fetchNextPage 등) */
  fetchNextPage: () => any;
  /** IntersectionObserver rootMargin */
  rootMargin?: string;
  /** IntersectionObserver threshold */
  threshold?: number;
  /** 무한 스크롤 활성화 여부 */
  enabled?: boolean;
  /** fetchNextPage 최소 호출 간격(ms) */
  throttleMs?: number;
}

export const useInfiniteScroll = <T extends HTMLElement = HTMLDivElement>({
  hasNextPage = true,
  isFetchingNextPage = false,
  fetchNextPage,
  rootMargin = '0px 0px 200px 0px',
  threshold = 0,
  enabled = true,
  throttleMs = 400,
}: UseInfiniteScrollOptions) => {
  const [target, setTarget] = useState<T | null>(null);

  const throttledFetchNextPage = useMemo(() => {
    let lastCalled = 0;

    const wrapped = () => {
      const now = Date.now();
      if (now - lastCalled < throttleMs) return;
      lastCalled = now;
      fetchNextPage();
    };

    return wrapped;
  }, [fetchNextPage, throttleMs]);

  useEffect(() => {
    if (!enabled) return;
    if (!target) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;
        if (!hasNextPage || isFetchingNextPage) return;
        throttledFetchNextPage();
      },
      {
        root: null,
        rootMargin,
        threshold,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [target, enabled, hasNextPage, isFetchingNextPage, rootMargin, threshold, throttledFetchNextPage]);

  const targetRef = useCallback((node: T | null) => {
    setTarget(node);
  }, []);

  return { targetRef };
};


