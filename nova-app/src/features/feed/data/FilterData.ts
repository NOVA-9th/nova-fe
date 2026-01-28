import { Globe, Newspaper, User } from 'lucide-react';

export const SORT_ITEMS = ['최신순', '관련도 순'];

export const PERIOD_ITEMS = ['1일', '7일', '30일'];

export const TYPE_ITEMS = [
  { label: '뉴스', icon: Newspaper },
  { label: '채용', icon: User },
  { label: '커뮤니티', icon: Globe },
];

export const KEYWORD_ITEMS = [
  {
    id: 1,
    filter: 'React',
  },
  {
    id: 2,
    filter: 'Server Components',
  },
  {
    id: 3,
    filter: 'Frontend',
  },
  {
    id: 4,
    filter: 'useHook',
  },
  {
    id: 5,
    filter: 'Transformer',
  },
  {
    id: 6,
    filter: 'Deep Learning',
  },
  {
    id: 7,
    filter: 'Attention',
  },
  {
    id: 8,
    filter: 'Flash Attention',
  },
  {
    id: 9,
    filter: 'Typescript',
  },
  {
    id: 10,
    filter: 'JavaScript',
  },
  {
    id: 11,
    filter: '타입시스템',
  },
];
