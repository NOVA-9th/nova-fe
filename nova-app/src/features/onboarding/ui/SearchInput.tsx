'use client';

import { Button, ChipInput, SectionHeader, TextBadge } from '@/shared/ui';
import { cn } from '@/shared/utils/cn';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useGetKeywords } from '@/shared/hooks/useGetKeywords';
import useDebounce from '@/shared/hooks/useDebounce';
import { showToast } from '@/shared/utils/toast';

interface SearchInputProps {
  selectedKeywords: string[];
  onAddKeyword?: (keyword: string) => void;
  onChangeKeywords: (chips: string[]) => void;
  className?: string;
}

export const SearchInput = memo(
  ({ onAddKeyword, selectedKeywords, onChangeKeywords, className }: SearchInputProps) => {
    const { data } = useGetKeywords();
    const suggestions = useMemo(() => data?.map((item) => item.name) ?? [], [data]);

    const [chips, setChips] = useState<string[]>(selectedKeywords);
    const [inputValue, setInputValue] = useState('');
    const debouncedChips = useDebounce(chips, 300);

    const prevRef = useRef<string[]>(selectedKeywords);

    useEffect(() => {
      const prev = prevRef.current;

      const isExternalChange =
        selectedKeywords.length !== prev.length || selectedKeywords.some((k) => !prev.includes(k));

      if (isExternalChange) {
        setChips(selectedKeywords);
        prevRef.current = selectedKeywords;
      }
    }, [selectedKeywords]);

    useEffect(() => {
      const prev = prevRef.current;
      const addedKeyword = debouncedChips.find((chip) => !prev.includes(chip));

      if (addedKeyword && !suggestions!.includes(addedKeyword)) {
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
      <div className={cn('flex flex-col items-start h-21 gap-3', className)}>
        <div className='flex flex-row h-7 gap-2.5 items-center'>
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
            value={chips}
            onChange={setChips}
            inputValue={inputValue}
            onInputChange={setInputValue}
            onAdd={onAddKeyword}
            suggestions={suggestions}
            placeholder='키워드를 입력하세요'
            className='flex-1 min-w-0 h-11 w-full'
          />
          <Button
            size='lg'
            label='추가'
            className='w-14 sm:w-15 h-11 typo-callout-key sm:typo-body-key'
            onClick={handleAddClick}
          />
        </div>
      </div>
    );
  },
);
