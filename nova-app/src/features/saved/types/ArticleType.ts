export type articleData = {
  id: string;
  type: 'news' | 'recruitment' | 'community';
  relevance: number;
  source: string;
  author: string;
  date: string;
  title: string;
  aiSummary: string;
  evidences: evidence[];
  tags: string[];
  originalUrl: string;
  isHidden: boolean;
  isBookmarked: boolean;
};

export type evidence = {
  id: string;
  evidenceSource: string;
  content: string;
};