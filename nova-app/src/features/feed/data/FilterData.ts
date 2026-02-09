import { Globe, Newspaper, User } from 'lucide-react';

export const SORT_ITEMS = ['최신순', '관련도 순'] as const;

export const PERIOD_ITEMS = ['1일', '7일', '30일'] as const;

export const TYPE_ITEMS = [
  { label: '뉴스', value: 'NEWS', icon: Newspaper },
  { label: '채용', value: 'JOB', icon: User },
  { label: '커뮤니티', value: 'COMMUNITY', icon: Globe },
] as const;

export type CardType = (typeof TYPE_ITEMS)[number]['value'];
