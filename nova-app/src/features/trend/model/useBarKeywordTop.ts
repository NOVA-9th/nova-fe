import { create } from 'zustand';

interface KeywordStore {
  category: string | null;
  toggleCategory: (keyword: string) => void;
  resetCategory: () => void;
}

export const useBarKeywordStore = create<KeywordStore>((set) => ({
  category: null,
  toggleCategory: (category) =>
    set((state) => ({ category: state.category === category ? null : category })),
  resetCategory: () => set({ category: null }),
}));
