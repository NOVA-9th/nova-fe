import { create } from 'zustand';

interface keywordStore {
  keywords: string[];
  toggleKeyword: (keyword: string) => boolean;
  resetKeyword: () => void;
}

export const useKeywordStore = create<keywordStore>((set, get) => ({
  keywords: [],
  toggleKeyword: (keyword) => {
    const { keywords } = get();
    if (keywords.includes(keyword)) {
      set({ keywords: keywords.filter((item) => item !== keyword) });
      return true;
    }
    if (keywords.length >= 3) {
      return false;
    }
    set({ keywords: [...keywords, keyword] });
    return true;
  },
  resetKeyword: () => set({ keywords: [] }),
}));
