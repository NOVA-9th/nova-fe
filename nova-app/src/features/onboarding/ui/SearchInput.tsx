'use client';

import { Button, ChipInput, SectionHeader, TextBadge } from '@/shared/ui';
import { InsertKey } from '@/features/onboarding/types/KeywordMap';
import { KEYWORD_MAP } from '@/features/onboarding/data/KeywordMaps';
import { cn } from '@/shared/utils/cn';

interface SearchInputProps {
  category: InsertKey;
  selectedKeywords: string[];
  onAddKeyword?: (keyword: string) => void;
  onChangeKeywords: (chips: string[]) => void;
  className?: string; // ← className props 추가
}

export const SearchInput = ({
  category,
  selectedKeywords,
  onChangeKeywords,
  className,
}: SearchInputProps) => {
  const suggestions = [...KEYWORD_MAP[category].advanced, ...KEYWORD_MAP[category].keywords];
  const handleAddClick = () => {};

  return (
    <div className={cn('flex flex-col items-start sm:max-w-150 h-21 gap-3', className)}>
      <div className='flex flex-row sm:max-w-150 h-7 gap-2.5 items-center'>
        <SectionHeader size='sm' text='검색' />
        <TextBadge
          size={'sm'}
          text={`${selectedKeywords.length}개`}
          variant={'surface'}
          peak={false}
          className='w-9.5 h-5'
        />
      </div>
      <div className='flex w-full gap-3 items-center'>
        <ChipInput
          size='lg'
          variant='surface'
          data={false}
          value={selectedKeywords}
          onChange={onChangeKeywords}
          suggestions={suggestions}
          placeholder='키워드를 입력하세요'
          className='flex-1 min-w-0 h-11'
        />
        <Button size='lg' label='추가' className='w-15 h-11' onClick={handleAddClick} />
      </div>
    </div>
  );
};
