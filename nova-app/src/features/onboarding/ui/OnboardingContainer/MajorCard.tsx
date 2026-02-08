'use client';

import { ToggleButton } from '@/shared/ui';
import { useEffect, useState } from 'react';
import { MAJOR_OPTIONS } from '@/features/onboarding/data/MajorOptions';
import { cn } from '@/shared/utils/cn';

interface MajorCardProps {
  onValidChange: (isValid: boolean) => void;
}

export const MajorCard = ({ onValidChange }: MajorCardProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    onValidChange(!!selected);
  }, [selected, onValidChange]);

  const toggleItem = (text: string) => {
    setSelected((prev) => (prev === text ? null : text));
  };

  return (
    <div className='grid grid-cols-2 w-full sm:grid-cols-4 gap-2 sm:gap-2.5'>
      {MAJOR_OPTIONS.map((text) => {
        return (
          <ToggleButton
            key={text}
            size='md'
            text={text}
            variant='outline'
            selected={selected === text}
            onClick={() => toggleItem(text)}
            className={cn('w-full max-w-36.75 h-11 text-base!')}
          />
        );
      })}
    </div>
  );
};
