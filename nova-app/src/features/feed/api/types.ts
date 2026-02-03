export interface FeedSearchRequest {
  sort: 'LATEST' | 'RELEVANCE';
  startDate: string;
  endDate: string;
  type: 'NEWS' | 'JOB' | 'COMMUNITY';
  keywords: string[];
  page: number;
  size: number;
  saved: boolean;
}

export interface CardNews {
  id: number;
  title: string;
  cardType: 'NEWS' | 'JOB' | 'COMMUNITY';
  author: string;
  publishedAt: string;
  summary: string;
  evidence: string;
  originalUrl: string;
  siteName: string;
  keywords: string[];
  saved: boolean;
}

export interface FeedSearchResponse {
  totalCount: number;
  cardnews: CardNews[];
}
