'use client';

import { useFeedFilterStore } from './feedFilter.store';

export const useFeedFilters = () => {
  return useFeedFilterStore();
};
