import { create } from 'zustand';

//일단 ui화면 test를 위해 임시로 저장한 store입니다. 추후 3개 이상 선택 못하게 block할 예정입니다.

interface keywordStore {
  keywords: string[];
  //   setKeyword: (ketwords: string[]) => void;
  toggleKeyword: (company: string) => void;
  resetKeyword: () => void;
}

export const useCompanyStore = create<keywordStore>((set) => ({
  keywords: [],
  //   setKeyword: (keywords) => set({ keywords }),
  toggleKeyword: (keyword) =>
    set((state) => ({
      keywords: state.keywords.includes(keyword)
        ? state.keywords.filter((item) => item !== keyword)
        : [...state.keywords, keyword],
    })),
  resetKeyword: () => set({ keywords: [] }),
}));
