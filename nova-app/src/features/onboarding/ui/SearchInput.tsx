'use client';

import { Button, ChipInput, SectionHeader, TextBadge } from '@/shared/ui';
import { InsertKey } from '@/features/onboarding/types/KeywordMap';
import { KEYWORD_MAP } from '@/features/onboarding/data/KeywordMaps';
import { cn } from '@/shared/utils/cn';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import useDebounce from '@/shared/hooks/useDebounce';
import { showToast } from '@/shared/utils/toast';

interface SearchInputProps {
  category: InsertKey;
  selectedKeywords: string[];
  onAddKeyword?: (keyword: string) => void;
  onChangeKeywords: (chips: string[]) => void;
  className?: string;
}

export const SearchInput = ({
  category,
  selectedKeywords,
  onAddKeyword,
  onChangeKeywords,
  className,
}: SearchInputProps) => {
  const suggestions = useMemo(
    () => [...KEYWORD_MAP[category].advanced, ...KEYWORD_MAP[category].keywords],
    [category],
  );

  const [chips, setChips] = useState<string[]>(selectedKeywords);
  const [inputValue, setInputValue] = useState('');
  const debouncedChips = useDebounce(chips, 300);

  const prevRef = useRef<string[]>(selectedKeywords);

  useEffect(() => {
    const prev = prevRef.current;
    const addedKeyword = debouncedChips.find((chip) => !prev.includes(chip));

    if (addedKeyword && !suggestions.includes(addedKeyword)) {
      setChips(prev);
      showToast.error('해당 키워드는 입력할 수 없습니다.');
      return;
    }

    if (debouncedChips.length > 5) {
      setChips(prev);
      showToast.error('키워드는 최대 5개까지 선택할 수 있어요.');
      return;
    }

    prevRef.current = debouncedChips;
    onChangeKeywords(debouncedChips);
  }, [debouncedChips, onChangeKeywords, suggestions]);

  const handleAddClick = () => {
    if (!inputValue.trim()) return;

    if (!suggestions.includes(inputValue)) {
      showToast.error('해당 키워드는 입력할 수 없습니다.');
      return;
    }

    if (chips.length >= 5) {
      showToast.error('키워드는 최대 5개까지 선택할 수 있어요.');
      return;
    }

    if (chips.includes(inputValue)) return;

    setChips([...chips, inputValue]);
    onAddKeyword?.(inputValue);
    setInputValue('');
  };

  return (
    <div className={cn('flex flex-col items-start sm:max-w-150 h-21 gap-3', className)}>
      <div className='flex items-center gap-2.5'>
        <SectionHeader size='sm' text='검색' />
        <TextBadge
          size='sm'
          text={`${chips.length}개`}
          variant='surface'
          peak={false}
          className='w-9.5 h-5'
        />
      </div>

      <div className='flex w-full gap-3 items-center'>
        <ChipInput
          size='lg'
          variant='surface'
          data={false}
          value={chips}
          onChange={setChips}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onAdd={onAddKeyword}
          suggestions={suggestions}
          placeholder='키워드를 입력하세요'
          className='flex-1 min-w-0 h-11'
        />

        <Button
          size='lg'
          label='추가'
          onClick={handleAddClick}
          disabled={!inputValue || chips.length >= 5}
          className='w-14 sm:w-15 h-11 typo-callout-key sm:typo-body-key'
        />
      </div>
    </div>
  );
};

export default memo(SearchInput);
