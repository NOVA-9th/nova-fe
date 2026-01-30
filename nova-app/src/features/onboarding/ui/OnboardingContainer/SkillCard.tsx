'use client';

import { ToggleButton } from '@/shared/ui';
import { useEffect, useState } from 'react';
import { SKILL_OPTIONS } from '@/features/onboarding/data/SkillOptions';

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
    <div className='w-150 h-24.5 flex flex-wrap gap-2.5'>
      {SKILL_OPTIONS.map((text) => (
        <ToggleButton
          size='lg'
          key={text}
          text={text}
          variant='outline'
          selected={selected === text}
          onClick={() => toggleItem(text)}
          className='w-73.5 h-11'
        />
      ))}
    </div>
  );
};
