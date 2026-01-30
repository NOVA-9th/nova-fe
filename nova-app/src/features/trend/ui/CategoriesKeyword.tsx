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
    <section className='grid grid-cols-2 gap-4 '>
      {keyword_data.map((item) => {
        const isSelected = selected === item.title;
        return (
          <div
            className={cn(
              'rounded-2xl bg-static p-5 pb-4 cursor-pointer',
              isSelected && 'bg-accent-peak shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]',
            )}
            key={item.title}
            onClick={() => handleClick(item.title)}
          >
            <h6 className={cn(' text-optional typo-headline-strong', isSelected && 'text-peak')}>
              {item.title}
            </h6>
            <p
              className={cn(
                'typo-subhead-base text-inactive line-clamp-1 text-ellipsis overflow-hidden',
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
