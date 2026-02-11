import { Bookmark, ChartGantt, MessagesSquare, User } from 'lucide-react';
import { SideItem } from '@/widgets/layouts/sidebar/types/SideItem';

export const SIDE_ITEMS: SideItem[] = [
  {
    href: '/feed',
    title: '피드',
    description: 'AI가 요약한 IT 뉴스',
    icon: MessagesSquare,
    badge: '새 게시물',
  },
  {
    href: '/trend',
    title: '트렌드',
    description: 'IT 트렌드 키워드 분석 및 시각화',
    icon: ChartGantt,
  },
  {
    href: '/saved',
    title: '저장함',
    description: '북마크한 아티클 관리',
    icon: Bookmark,
  },
  {
    href: '/profile',
    title: '프로필',
    description: '개인화 설정 및 계정 관리',
    icon: User,
  },
];
