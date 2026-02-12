import { memo } from 'react';
import { TextInput } from '@/shared/ui';
import { Search } from 'lucide-react';
import { useFeedFilterStore } from '@/features/feed/model/useFeedFilterStore';

export const HeaderSearch = memo(function HeaderSearchInput({ className }: { className?: string }) {
  const searchKeyword = useFeedFilterStore((s) => s.searchKeyword);
  const setSearchKeyword = useFeedFilterStore((s) => s.setSearchKeyword);

  return (
    <TextInput
      size='lg'
      value={searchKeyword}
      onChange={setSearchKeyword}
      icon={Search}
      placeholder='아티클 및 트렌드를 검색해보세요'
      className={className}
    />
  );
});
