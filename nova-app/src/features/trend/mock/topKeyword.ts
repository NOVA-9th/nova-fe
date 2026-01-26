// mock.ts

export interface KeywordItem {
  rank: number;
  keyword: string;
  category: string;
  count: number;
  changeRate: number; // %
  selected: boolean;
}

export const KEYWORDS: KeywordItem[] = [
  { rank: 1, keyword: 'LLM', category: 'AI / ML', count: 1590, changeRate: 15, selected: true },
  { rank: 2, keyword: 'RAG', category: 'AI / ML', count: 1220, changeRate: 15, selected: false },
  { rank: 3, keyword: 'React', category: 'Frontend', count: 850, changeRate: 15, selected: true },
  {
    rank: 4,
    keyword: 'Transformer',
    category: 'AI / ML',
    count: 840,
    changeRate: 15,
    selected: false,
  },
  {
    rank: 5,
    keyword: 'Kubernetes',
    category: 'DevOps',
    count: 720,
    changeRate: 15,
    selected: false,
  },
];
