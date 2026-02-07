import { MemberLevel } from '@/shared/types/memberLevel';

export type MemberPersonalizationDto = {
  level: MemberLevel;
  background: string;
  interests: number[];
  keywords: string[];
};
