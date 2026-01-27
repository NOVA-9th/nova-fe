export interface KeywordItem {
  rank: number;
  keyword: string;
  category: string;
  count: number;
  changeRate: string;
}

export const KEYWORDS: KeywordItem[] = [
  { rank: 1, keyword: 'LLM', category: 'AI / ML', count: 1590, changeRate: '+15' },
  { rank: 2, keyword: 'RAG', category: 'AI / ML', count: 1220, changeRate: '-23' },
  { rank: 3, keyword: 'React', category: 'Frontend', count: 850, changeRate: '+15' },
  {
    rank: 4,
    keyword: 'Transformer',
    category: 'AI / ML',
    count: 840,
    changeRate: '-23',
  },
  {
    rank: 5,
    keyword: 'Kubernetes',
    category: 'DevOps',
    count: 720,
    changeRate: '+15',
  },
  {
    rank: 6,
    keyword: 'TypeScript',
    category: 'Frontend',
    count: 1590,
    changeRate: '-23',
  },
  {
    rank: 7,
    keyword: 'Docker',
    category: 'DevOps',
    count: 1220,
    changeRate: '-23',
  },
  {
    rank: 8,
    keyword: 'SpringBoot',
    category: 'Backend',
    count: 850,
    changeRate: '+15',
  },
  {
    rank: 9,
    keyword: 'AWS',
    category: 'Cloud',
    count: 840,
    changeRate: '-23',
  },
  {
    rank: 10,
    keyword: 'Python',
    category: 'Language',
    count: 720,
    changeRate: '+15',
  },
];
