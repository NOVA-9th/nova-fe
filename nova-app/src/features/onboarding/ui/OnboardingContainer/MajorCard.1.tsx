'use client';
import { ToggleButton } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';
import { useState, useEffect } from 'react';
import { MAJOR_OPTIONS } from '../../data/MajorOptions';
import { MajorCardProps } from './MajorCard';

export const MajorCard = ({ onValidChange }: MajorCardProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    onValidChange(!!selected);
  }, [selected, onValidChange]);

  const toggleItem = (text: string) => {
    setSelected((prev) => (prev === text ? null : text));
  };

  return (
    <div className='w-full h-full sm:max-w-150 max-w-80 flex flex-wrap gap-2.5'>
      {MAJOR_OPTIONS.map((text) => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
        const formattedText = isMobile && text.includes('&') ? text.replace('&', '&\n') : text;

        return (
          <ToggleButton
            key={text}
            size={isMobile ? 'md' : 'lg'}
            text={formattedText}
            variant='outline'
            selected={selected === text}
            onClick={() => toggleItem(text)}
            className={cn(
              'w-full max-w-[72.5px] sm:max-w-[142.5px] h-11 whitespace-pre-line sm:whitespace-normal sm:break-words',
            )}
          />
        );
      })}
    </div>
  );
};
