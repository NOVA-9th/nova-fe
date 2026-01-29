import { ItemList, SectionHeader } from '@/shared/ui';
import { Trash2 } from 'lucide-react';

export const DataManagementSection = () => {
  return (
    <section className='flex flex-col justify-start items-start w-full gap-3 bg-base rounded-static-frame p-5'>
      <SectionHeader text='데이터 관리' size='lg' />
      <ItemList
        label='저장함 목록 삭제'
        size='lg'
        leftIcon={Trash2}
        description='저장한 아티클 목록 및  활동 로그를 삭제합니다. (복구 불가)'
        rightButton={{ label: '초기화하기', size: 'md', style: 'data', peak: false }}
        className='w-full justify-between'
      />
      <ItemList
        label='숨김 목록 초기화'
        size='lg'
        leftIcon={Trash2}
        description='숨긴 아티클 목록 및  활동 로그를 삭제합니다. (복구 불가)'
        rightButton={{ label: '초기화하기', size: 'md', style: 'data', peak: false }}
        className='w-full justify-between'
      />
    </section>
  );
};
