'use client';
import { keyword_data } from '@/features/trend/mock/keyword';
import { cn } from '@/shared/utils/cn';
import { useState } from 'react';

export const CategoriesKeyword = () => {
  const [selected, setSelected] = useState<string | null>('');

  const handleClick = (title: string) => {
    setSelected((pre) => (pre === title ? null : title));
  };

  return (
    <section className='grid grid-cols-2 md:gap-4 gap-2.5'>
      {keyword_data.map((item) => {
        const isSelected = selected === item.title;
        return (
          <div
            className={cn(
              'rounded-static-frame bg-static md:p-5 px-5 py-2.5 cursor-pointer',
              isSelected && 'bg-accent-peak shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]',
            )}
            key={item.title}
            onClick={() => handleClick(item.title)}
          >
            <h6
              className={cn(
                'md:text-left! text-center text-optional typo-headline-strong',
                isSelected && 'text-peak',
              )}
            >
              {item.title}
            </h6>
            <p
              className={cn(
                'hidden md:block! typo-subhead-base text-inactive  truncate',
                isSelected && 'text-peak',
              )}
            >
              {item.content}
            </p>
          </div>
        );
      })}
    </section>
  );
};
