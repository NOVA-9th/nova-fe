'use client';

import { getFeedList } from '@/features/feed/api/feed';
import { ArticleCard } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { useFeedFilters } from '@/features/feed/model/useFeedFilters';
import type { FeedSearchRequest } from '@/features/feed/types/api';

const ALL_TYPES: FeedSearchRequest['type'] = ['NEWS', 'JOB', 'COMMUNITY'];

const sortToApi = (ui: string): FeedSearchRequest['sort'] =>
  ui === '최신순' ? 'LATEST' : 'RELEVANCE';

const periodToDays = (ui: string) => {
  if (ui === '1일') return 1;
  if (ui === '7일') return 7;
  return 30;
};

const FeedArticle = () => {
  const { selectedSort, selectedPeriod, selectedTypes, selectedKeywords } = useFeedFilters();

  const endDate = new Date();
  const days = periodToDays(selectedPeriod);
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - days);

  const params: FeedSearchRequest = {
    sort: sortToApi(selectedSort),
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    type: selectedTypes.length === 0 ? ALL_TYPES : selectedTypes,
    keywords: selectedKeywords,
    page: 1,
    size: 10,
    saved: false,
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['feedList', params],
    queryFn: () => getFeedList(params),
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했어요</div>;

  const feedList = data?.data?.cardnews ?? [];

  return (
    <section className='space-y-4'>
      {feedList.map((article: any) => (
        <ArticleCard key={article.id} articleData={article} />
      ))}
    </section>
  );
};

export default FeedArticle;
