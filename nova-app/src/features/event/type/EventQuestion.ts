import { Role } from '../model/useEventStore';

export type EventQuestion = {
  id: string;
  role: Role;
  question: string;
  options?: string[];
  answer?: string;
};
