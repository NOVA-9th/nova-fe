import { Role } from '../model/useEventStore';

export type EventQuestion = {
  id: string;
  role: Role;
  question: string;
  options?: string[];
  answer?: string;
  /** 정답 근거 (토스트 등에 표시) */
  rationale?: string;
};
