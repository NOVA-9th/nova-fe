'use client';

import { useState } from 'react';
import { toggleArray } from '@/features/feed/utils/toggleArray';

export const useFeedFilters = () => {
  const [selectedSort, setSelectedSort] = useState('최신순');
  const [selectedPeriod, setSelectedPeriod] = useState('1일');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const toggleType = (type: string) => setSelectedTypes((prev) => toggleArray(prev, type));
  const toggleKeyword = (keyword: string) =>
    setSelectedKeywords((prev) => toggleArray(prev, keyword));

  const resetSort = () => setSelectedSort('최신순');
  const resetPeriod = () => setSelectedPeriod('1일');
  const resetTypes = () => setSelectedTypes([]);
  const resetKeywords = () => setSelectedKeywords([]);

  return {
    // state
    selectedSort,
    selectedPeriod,
    selectedTypes,
    selectedKeywords,

    // setters
    setSelectedSort,
    setSelectedPeriod,
    setSelectedTypes,

    // actions
    toggleType,
    toggleKeyword,
    resetSort,
    resetPeriod,
    resetTypes,
    resetKeywords,
  };
};
