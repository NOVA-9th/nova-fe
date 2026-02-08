'use client';

import React from 'react';
import { RotateCcw } from 'lucide-react';
import { SectionHeader, TextButton } from '@/shared/ui';
import clsx from 'clsx';

interface FilterSectionProps {
  title: string;
  onReset: () => void;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const FilterSection = ({
  title,
  onReset,
  badge,
  children,
  className,
}: FilterSectionProps) => {
  return (
    <section className={clsx('bg-base rounded-static-frame border border-outline p-5', className)}>
      <div className='flex items-center justify-between mb-5 flex-nowrap whitespace-nowrap'>
        <div className='flex items-center gap-2.5'>
          <SectionHeader size='lg' text={title} />
          {badge}
        </div>
        <TextButton
          label='초기화'
          rightIcon={RotateCcw}
          className='text-optional'
          onClick={onReset}
        />
      </div>
      {children}
    </section>
  );
};
