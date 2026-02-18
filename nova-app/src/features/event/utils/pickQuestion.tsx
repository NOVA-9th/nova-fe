import { EVENT_QUESTIONS } from '@/features/event/data/eventQuestion';
import type { Role } from '@/features/event/model/useEventStore';
import { EventQuestion } from '@/features/event/type/EventQuestion';

const pickRandom = <T,>(arr: T[], count: number): T[] => {
  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy.slice(0, Math.min(count, copy.length));
};

export const pickRandomQuestionsByRole = (role: Role, count = 4): EventQuestion[] => {
  const filtered = EVENT_QUESTIONS.filter((q) => q.role === role);
  return pickRandom(filtered, count);
};
