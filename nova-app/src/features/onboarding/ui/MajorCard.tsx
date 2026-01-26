'use client';

import { StepComponentProps } from '@/features/onboarding/types/StepItem';
import { ToggleButton } from '@/shared/ui';
import { useEffect, useState } from 'react';
import { MAJOR_OPTIONS } from '../data/MajorOptions';

const MajorCard = ({ onValidChange }: StepComponentProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    onValidChange(!!selected);
  }, [selected, onValidChange]);

  const toggleItem = (text: string) => {
    setSelected((prev) => (prev === text ? null : text));
  };

  return (
    <div className='w-150 h-24.5 flex flex-wrap gap-2.5'>
      {MAJOR_OPTIONS.map((text) => (
        <ToggleButton
          size='lg'
          key={text}
          text={text}
          variant='outline'
          selected={selected === text}
          onClick={() => toggleItem(text)}
          className='w-[142.5px] h-11'
        />
      ))}
    </div>
  );
};

export default MajorCard;
