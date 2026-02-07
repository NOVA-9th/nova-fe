'use client';

import { create } from 'zustand';
import { toggleArray } from '@/features/feed/utils/toggleArray';
import type { CardType } from '@/features/feed/data/FilterData';

export type SortUI = '최신순' | '관련도순';
export type PeriodUI = '1일' | '7일' | '30일';

interface FeedFilterState {
  // state
  selectedSort: SortUI;
  selectedPeriod: PeriodUI;
  selectedTypes: CardType[];
  selectedKeywords: string[];

  // actions
  setSelectedSort: (sort: SortUI) => void;
  setSelectedPeriod: (period: PeriodUI) => void;
  setSelectedTypes: (types: CardType[]) => void;

  toggleType: (type: CardType) => void;
  toggleKeyword: (keyword: string) => void;

  resetSort: () => void;
  resetPeriod: () => void;
  resetTypes: () => void;
  resetKeywords: () => void;

  resetAll: () => void;
}

const DEFAULT_SORT: SortUI = '최신순';
const DEFAULT_PERIOD: PeriodUI = '1일';

export const useFeedFilterStore = create<FeedFilterState>((set) => ({
  selectedSort: DEFAULT_SORT,
  selectedPeriod: DEFAULT_PERIOD,
  selectedTypes: [],
  selectedKeywords: [],

  setSelectedSort: (selectedSort) => set({ selectedSort }),
  setSelectedPeriod: (selectedPeriod) => set({ selectedPeriod }),
  setSelectedTypes: (selectedTypes) => set({ selectedTypes }),

  toggleType: (type) => set((state) => ({ selectedTypes: toggleArray(state.selectedTypes, type) })),

  toggleKeyword: (keyword) =>
    set((state) => ({ selectedKeywords: toggleArray(state.selectedKeywords, keyword) })),

  resetSort: () => set({ selectedSort: DEFAULT_SORT }),
  resetPeriod: () => set({ selectedPeriod: DEFAULT_PERIOD }),
  resetTypes: () => set({ selectedTypes: [] }),
  resetKeywords: () => set({ selectedKeywords: [] }),

  resetAll: () =>
    set({
      selectedSort: DEFAULT_SORT,
      selectedPeriod: DEFAULT_PERIOD,
      selectedTypes: [],
      selectedKeywords: [],
    }),
}));
