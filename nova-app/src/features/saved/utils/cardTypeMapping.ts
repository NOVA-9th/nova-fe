import { FileUser, EarthIcon, Newspaper, Grid2X2Icon, LucideIcon } from 'lucide-react';

/**
 * 카드 타입 이름을 프론트엔드 표시 이름으로 변환
 */
export const mapCardTypeNameToDisplay = (cardTypeName: string): string => {
  const nameMap: Record<string, string> = {
    NEWS: '뉴스',
    JOB: '채용',
    COMMUNITY: '커뮤니티',
  };

  return nameMap[cardTypeName] || cardTypeName;
};

/**
 * 카드 타입 표시 이름에 해당하는 아이콘 반환
 */
export const getCardTypeIcon = (displayName: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    '뉴스': Newspaper,
    '채용': FileUser,
    '커뮤니티': EarthIcon,
    '전체': Grid2X2Icon,
  };

  return iconMap[displayName] || Grid2X2Icon;
};


