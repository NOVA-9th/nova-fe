'use client';

import SearchInput from '@/features/onboarding/ui/SearchInput';
import { useEffect, useState } from 'react';

interface InterestKeywordCardProps {
  onValidChange: (isValid: boolean) => void;
}

export const InterestKeywordCard = ({ onValidChange }: InterestKeywordCardProps) => {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  useEffect(() => {
    onValidChange(selectedKeywords.length > 0);
  }, [selectedKeywords, onValidChange]);

  return (
    <SearchInput
      selectedKeywords={selectedKeywords}
      onChangeKeywords={setSelectedKeywords}
      showAddButton={true}
      description={false}
      className='sm:h-24.5 h-22.5'
    />
  );
};
