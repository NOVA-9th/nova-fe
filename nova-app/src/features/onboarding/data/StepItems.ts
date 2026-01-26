import { MajorCard, InterestCard, SkillCard, InterestKeywordCard } from '@/features/onboarding/ui';
import { Step, StepItem } from '@/features/onboarding/types/StepItem';

export const STEP_ITEMS: Record<Step, StepItem> = {
  1: {
    label: '전공 분야 선택',
    description: '현재 학교나 직장에서의 전공 분야를 선택해주세요',
    Component: MajorCard,
  },
  2: {
    label: '관심 분야 선택',
    description: 'IT 직군 내 관심있는 분야를 선택해주세요 (최대 2개)',
    Component: InterestCard,
  },
  3: {
    label: '기술 역량 선택',
    description: 'IT 직군 내에서의 난이도와 기술 역량을 선택해주세요',
    Component: SkillCard,
  },
  4: {
    label: '관심 키워드 선택',
    description: 'IT 직군 내에서의 난이도와 기술 역량을 선택해주세요',
    Component: InterestKeywordCard,
  },
};
