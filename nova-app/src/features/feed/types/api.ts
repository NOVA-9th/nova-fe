export type CardNews = {
  id: number;
  title: string;
  cardtype: 'NEWS' | 'JOB' | 'COMMUNITY';
  author: string;
  publishedAt: string;
  summary: string;
  evidence: string;
  originalUrl: string;
  siteName: string;
  keywords: string[];
  saved: boolean;
};

export type FeedSearchRequest = {
  sort: 'LATEST' | 'RELEVANCE';
  startDate: string;
  endDate: string;
  type: 'NEWS' | 'JOB' | 'COMMUNITY';
  keywords: string[];
  page: number;
  size: number;
  saved: boolean;
};

export type FeedSearchResponse = {
  totalCount: number;
  cardnews: CardNews[];
};
