import { create } from 'zustand';

interface KeywordStore {
  category: string | null;
  setCategory: (keyword: string) => void;
  resetCategory: () => void;
}

export const useBarKeywordStore = create<KeywordStore>((set) => ({
  category: null,

  setCategory: (category) => set({ category }),

  resetCategory: () => set({ category: null }),
}));
