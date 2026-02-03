'use client';

import { ToggleButton } from '@/shared/ui';
import { useEffect, useState } from 'react';
import { SKILL_OPTIONS } from '@/features/onboarding/data/SkillOptions';
import { cn } from '@/shared/utils/cn';

interface SkillCardProps {
  onValidChange: (isValid: boolean) => void;
}

export const SkillCard = ({ onValidChange }: SkillCardProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    onValidChange(!!selected);
  }, [selected, onValidChange]);

  const toggleItem = (text: string) => {
    setSelected((prev) => (prev === text ? null : text));
  };

  return (
    <div className='sm:w-150 sm:h-24.5 flex flex-wrap gap-2.5 h-22.5'>
      {SKILL_OPTIONS.map((text) => (
        <ToggleButton
          size='lg'
          key={text}
          text={text}
          variant='outline'
          selected={selected === text}
          onClick={() => toggleItem(text)}
          className={cn('w-full max-w-38.5 sm:max-w-73.5 max-h-10 sm:h-11')}
        />
      ))}
    </div>
  );
};
