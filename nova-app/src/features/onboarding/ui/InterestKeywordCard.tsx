'use client';

import SearchInput from './SearchInput';
import { useEffect, useState } from 'react';

interface InterestKeywordCardProps {
  onValidChange: (isValid: boolean) => void;
}

const InterestKeywordCard = ({ onValidChange }: InterestKeywordCardProps) => {
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
    />
  );
};

export default InterestKeywordCard;
