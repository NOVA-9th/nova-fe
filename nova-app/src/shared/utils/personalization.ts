import { MemberLevel } from '@/features/profile/api/types';
import { PERSONALIZATION_TEXT } from '@/features/profile/data/PersonalizationText';

export const getInterestIdByIndex = (index: number) =>
  PERSONALIZATION_TEXT.sections.interests.ids[index];

export const getLevelIndex = (level: MemberLevel | null) => {
  if (!level) return 0;
  const levels = [
    MemberLevel.NOVICE,
    MemberLevel.BEGINNER,
    MemberLevel.INTERMEDIATE,
    MemberLevel.ADVANCED,
  ];
  return levels.indexOf(level);
};
