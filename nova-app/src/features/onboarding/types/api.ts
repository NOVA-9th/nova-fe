import { MemberLevel } from '@/shared/types/memberLevel';

export type MemberPersonalizationDto = {
  level: MemberLevel;
  background: string;
  interests: number[];
  keywords: string[];
};

export type KeywordResponse = {
  id: number; // 키워드 고유 ID
  interestId: number; // 연관 관심사 ID
  name: string; // 키워드 텍스트
};

export type KeywordPersonalizationDto = KeywordResponse[];
