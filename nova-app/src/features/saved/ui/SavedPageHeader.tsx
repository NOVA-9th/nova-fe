'use client';

import { PageHeader, TextButton } from '@/shared/ui';
import { Bookmark, ListFilter } from 'lucide-react';
import { useSavedFilterStore } from '@/features/saved/model/useSavedFilterStore';

export const SavedPageHeader = () => {
  const { resetAll } = useSavedFilterStore();

  return (
    <div className='flex w-full items-center justify-between pr-4'>
      <PageHeader text='저장함' icon={Bookmark} />
      <TextButton
        onClick={resetAll}
        size='lg'
        label='필터 초기화'
        leftIcon={ListFilter}
        style='surface'
        className='flex md:hidden h-11 justify-center items-center whitespace-nowrap px-padding-bold py-padding-regular rounded-interactive-default bg-surface'
      />
    </div>
  );
};


