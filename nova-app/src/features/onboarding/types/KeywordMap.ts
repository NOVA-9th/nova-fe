import { INTEREST_OPTIONS } from '@/features/onboarding/data/InterestOptions';

export type InsertKey = (typeof INTEREST_OPTIONS)[number];

export type KeywordCategory = {
  keywords: string[];
  advanced: string[];
};
