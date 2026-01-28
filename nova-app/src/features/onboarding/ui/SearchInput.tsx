import { Button, ChipInput, SectionHeader, TextBadge } from '@/shared/ui';
import { InsertKey } from '@/features/onboarding/types/KeywordMap';
import { KEYWORD_MAP } from '@/features/onboarding/data/KeywordMaps';

interface SearchInputProps {
  category: InsertKey;
  selectedKeywords: string[];
  onAddKeyword: (keyword: string) => void;
  onChangeKeywords: (chips: string[]) => void;
}

const SearchInput = ({ category, selectedKeywords, onChangeKeywords }: SearchInputProps) => {
  const suggestions = [...KEYWORD_MAP[category].advanced, ...KEYWORD_MAP[category].keywords];
  const handleAddClick = () => {};

  return (
    <div className='flex flex-col items-start w-150 h-21 gap-3'>
      <div className='flex flex-row w-150 h-7 gap-2.5 items-center'>
        <SectionHeader size='sm' text='검색' />
        <TextBadge
          size={'sm'}
          text={`${selectedKeywords.length}개`}
          variant={'surface'}
          peak={false}
          className='w-9.5 h-5'
        />
      </div>
      <div className='w-150 flex flex-row gap-3'>
        <ChipInput
          size='lg'
          variant='surface'
          data={false}
          value={selectedKeywords}
          onChange={onChangeKeywords}
          suggestions={suggestions}
          placeholder='키워드를 입력하고 콤마(,)로 구분해주세요'
          className='w-132 h-11'
        />
        <Button size='lg' label='추가' className='w-15 h-11' onClick={handleAddClick} />
      </div>
    </div>
  );
};

export default SearchInput;
