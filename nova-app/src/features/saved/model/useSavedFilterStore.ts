'use client';

import { create } from 'zustand';
import { toggleArray } from '@/features/feed/utils/toggleArray';
import type { CardType } from '@/features/feed/data/FilterData';

export type SortUI = '최신순' | '관련도 순';

interface SavedFilterState {
  // state
  selectedSort: SortUI;
  selectedTypes: CardType[];
  selectedKeywords: string[];
  searchKeyword: string; // 제목/키워드 검색용

  // actions
  setSelectedSort: (sort: SortUI) => void;
  setSelectedTypes: (types: CardType[]) => void;
  setSearchKeyword: (keyword: string) => void;

  toggleType: (type: CardType) => void;
  toggleKeyword: (keyword: string) => void;

  resetSort: () => void;
  resetTypes: () => void;
  resetKeywords: () => void;
  resetSearchKeyword: () => void;
  resetAll: () => void;
}

const DEFAULT_SORT: SortUI = '최신순';

export const useSavedFilterStore = create<SavedFilterState>((set) => ({
  selectedSort: DEFAULT_SORT,
  selectedTypes: [],
  selectedKeywords: [],
  searchKeyword: '',

  setSelectedSort: (selectedSort) => set({ selectedSort }),
  setSelectedTypes: (selectedTypes) => set({ selectedTypes }),
  setSearchKeyword: (searchKeyword) => set({ searchKeyword }),

  toggleType: (type) => set((state) => ({ selectedTypes: toggleArray(state.selectedTypes, type) })),

  toggleKeyword: (keyword) =>
    set((state) => ({ selectedKeywords: toggleArray(state.selectedKeywords, keyword) })),

  resetSort: () => set({ selectedSort: DEFAULT_SORT }),
  resetTypes: () => set({ selectedTypes: [] }),
  resetKeywords: () => set({ selectedKeywords: [] }),
  resetSearchKeyword: () => set({ searchKeyword: '' }),
  resetAll: () =>
    set({
      selectedSort: DEFAULT_SORT,
      selectedTypes: [],
      selectedKeywords: [],
      searchKeyword: '',
    }),
}));


