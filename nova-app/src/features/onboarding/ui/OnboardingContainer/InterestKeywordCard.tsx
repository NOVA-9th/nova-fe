'use client';

import { SearchInput } from '@/features/onboarding/ui';
import { useEffect, useState } from 'react';

interface InterestKeywordCardProps {
  onValidChange: (isValid: boolean) => void;
}

export const InterestKeywordCard = ({ onValidChange }: InterestKeywordCardProps) => {
  const category = '웹 프론트엔드'; // Step2 관심분야 값 (목 데이터)
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const handleAddKeyword = (keyword: string) => {};

  useEffect(() => {
    onValidChange(selectedKeywords.length > 0);
  }, [selectedKeywords, onValidChange]);

  return (
    <SearchInput
      category={category}
      selectedKeywords={selectedKeywords}
      onAddKeyword={handleAddKeyword}
      onChangeKeywords={setSelectedKeywords}
      className='sm:h-24.5 h-22.5'
    />
  );
};
