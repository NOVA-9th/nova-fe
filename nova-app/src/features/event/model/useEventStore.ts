import { create } from 'zustand';

export type Role = 'PM' | 'DESIGN' | 'FE' | 'BE';
export type RoundKey = 'round1' | 'round2' | 'round3' | 'round4';
export type AnswerValue = string | string[] | number | boolean | null;

export type EventPhase = 'ROLE' | 'QUIZ' | 'RESULT' | 'ROULETTE';

type EventState = {
  phase: EventPhase;

  role: Role | null;

  pickedQuestionIds: string[];

  answers: Partial<Record<RoundKey, AnswerValue>>;

  score: number;
  spins: number;

  setRole: (role: Role) => void;

  setPickedQuestionIds: (ids: string[]) => void;
  setAnswer: (round: RoundKey, value: AnswerValue) => void;

  setPhase: (phase: EventPhase) => void;
  setResult: (payload: { score: number; spins: number }) => void;

  consumeSpin: () => void;

  resetAnswers: () => void;
  resetAll: () => void;
};

export const useEventStore = create<EventState>((set) => ({
  phase: 'ROLE',
  role: null,

  pickedQuestionIds: [],
  answers: {},

  score: 0,
  spins: 0,

  setRole: (role) =>
    set({
      role,
      phase: 'QUIZ',
      pickedQuestionIds: [],
      answers: {},
      score: 0,
      spins: 0,
    }),

  setPickedQuestionIds: (ids) => set({ pickedQuestionIds: ids }),

  setAnswer: (round, value) =>
    set((state) => ({
      answers: { ...state.answers, [round]: value },
    })),

  setPhase: (phase) => set({ phase }),

  setResult: ({ score, spins }) => set({ score, spins }),

  consumeSpin: () =>
    set((state) => ({
      spins: Math.max(0, state.spins - 1),
    })),

  resetAnswers: () => set({ answers: {}, score: 0, spins: 0 }),

  resetAll: () =>
    set({
      phase: 'ROLE',
      role: null,
      pickedQuestionIds: [],
      answers: {},
      score: 0,
      spins: 0,
    }),
}));
