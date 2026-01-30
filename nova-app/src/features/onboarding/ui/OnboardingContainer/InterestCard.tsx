'use client';

import { ToggleButton } from '@/shared/ui';
import { useEffect, useState } from 'react';
import { INTEREST_OPTIONS } from '@/features/onboarding/data/InterestOptions';

interface InterestCardProps {
  onValidChange: (isValid: boolean) => void;
}

export const InterestCard = ({ onValidChange }: InterestCardProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    onValidChange(selected.length > 0); // 1개 이상 선택 시 다음 버튼 활성화
  }, [selected, onValidChange]);

  const toggleItem = (text: string) => {
    setSelected((prev) => {
      if (prev.includes(text)) {
        return prev.filter((item) => item !== text);
      } else if (prev.length < 2) {
        return [...prev, text];
      }
      return prev;
    });
  };

  return (
    <div className='w-150 h-53 flex flex-wrap gap-2.5'>
      {INTEREST_OPTIONS.map((text) => (
        <ToggleButton
          size='lg'
          key={text}
          text={text}
          variant='outline'
          selected={selected.includes(text)}
          onClick={() => toggleItem(text)}
          className='w-[142.5px] h-11'
        />
      ))}
    </div>
  );
};
