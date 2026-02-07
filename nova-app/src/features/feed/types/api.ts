export type CardNews = {
  id: number;
  title: string;
  cardtype: string[];
  author: string;
  publishedAt: string;
  summary: string;
  evidence: string[];
  originalUrl: string;
  siteName: string;
  keywords: string[];
  saved: boolean;
};

export type FeedSearchRequest = {
  sort: 'LATEST' | 'RELEVANCE';
  startDate: string;
  endDate: string;
  type: string[];
  keywords: string[];
  page: number;
  size: number;
  saved: boolean;
};

export type FeedSearchResponse = {
  totalCount: number;
  cardnews: CardNews[];
};
