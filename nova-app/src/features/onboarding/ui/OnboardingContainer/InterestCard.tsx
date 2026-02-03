'use client';

import { ToggleButton } from '@/shared/ui';
import { useEffect, useState } from 'react';
import { INTEREST_OPTIONS } from '@/features/onboarding/data/InterestOptions';
import { cn } from '@/shared/utils/cn';
import { showToast } from '@/shared/utils/toast';

interface InterestCardProps {
  onValidChange: (isValid: boolean) => void;
}

export const InterestCard = ({ onValidChange }: InterestCardProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    onValidChange(selected.length > 0); // 1개 이상 선택 시 다음 버튼 활성화
  }, [selected, onValidChange]);

  const toggleItem = (text: string) => {
    // 이미 선택된 경우: 제거
    if (selected.includes(text)) {
      setSelected((prev) => prev.filter((item) => item !== text));
      return;
    }

    // 2개 미만이면 추가
    if (selected.length < 2) {
      setSelected((prev) => [...prev, text]);
      return;
    }

    // 이미 2개면 토스트만
    showToast.error('최대 2개까지 선택 가능합니다.');
  };

  return (
    <div className='w-full h-full sm:max-w-150 sm:max-h-53 max-w-80 max-h-143.5 flex flex-wrap gap-2 sm:gap-2.5'>
      {INTEREST_OPTIONS.map((text) => (
        <ToggleButton
          size='md'
          key={text}
          text={text}
          variant='outline'
          selected={selected.includes(text)}
          onClick={() => toggleItem(text)}
          className={cn('w-full max-w-39 sm:max-w-[142.5px] h-11 sm:text-base!')}
        />
      ))}
    </div>
  );
};
