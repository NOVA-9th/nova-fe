import { INTEREST_OPTIONS } from '../data/InterestOptions';

export type InsertKey = (typeof INTEREST_OPTIONS)[number];

export type KeywordCategory = {
  keywords: string[];
  advanced: string[];
};
