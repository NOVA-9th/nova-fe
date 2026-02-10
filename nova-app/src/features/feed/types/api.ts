export type CardNews = {
  id: number;
  title: string;
  cardType: string;
  score: number;
  author: string;
  publishedAt: string;
  summary: string;
  evidence: string[];
  originalUrl: string;
  siteName: string;
  keywords: string[];
  saved: boolean;
  hidden: boolean;
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
  searchKeyword?: string;
  hidden: boolean;
};

export type FeedSearchResponse = {
  totalCount: number;
  cardnews: CardNews[];
};

export type KeywordsResponse = {
  id: number;
  interestId: number;
  name: string;
};

export interface Pageable {
  page: number;
  size: number;
  sort: string[];
}

export interface SearchFeedParams {
  searchKeyword?: string;
  pageable: Pageable;
}
