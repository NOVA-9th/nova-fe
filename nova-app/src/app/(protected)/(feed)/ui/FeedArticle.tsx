'use client';

import { getFeedList } from '@/features/feed/api/feed';
import { mockArticleData } from '@/features/saved/mocks/articleMockData';
import { ArticleCard } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';

const FeedArticle = () => {
  const params = {
    sort: 'RELEVANCE' as const,
    startDate: '2026-01-01T15:00:00Z',
    endDate: '2026-01-31T15:00:00Z',
    type: ['NEWS', 'COMMUNITY'],
    keywords: ['Spring Boot', 'React'],
    page: 1,
    size: 10,
    saved: false,
  };

  const { data } = useQuery({
    queryKey: ['key'],
    queryFn: () => getFeedList(params),
  });

  console.log(data);

  return (
    <section className='space-y-4'>
      {mockArticleData.map((article) => (
        <ArticleCard key={article.id} articleData={article} />
      ))}
    </section>
  );
};

export default FeedArticle;
