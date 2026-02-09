import { create } from 'zustand';

//일단 ui화면 test를 위해 임시로 저장한 store입니다. 추후 3개 이상 선택 못하게 block할 예정입니다.

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
