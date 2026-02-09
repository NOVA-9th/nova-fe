'use client';

import { useState } from 'react';
import { ItemList, SectionHeader, Modal } from '@/shared/ui';
import { Trash2 } from 'lucide-react';
import { showToast } from '@/shared/utils/toast';
import { useDeleteAllBookmarks, useResetHiddenCardNews } from '@/features/profile/hooks/useProfile';

export const DataManagementSection = () => {
  const [modalType, setModalType] = useState<'saved' | 'hidden' | null>(null);

  const deleteAllBookmarksMutation = useDeleteAllBookmarks();
  const resetHiddenMutation = useResetHiddenCardNews();

  const handleSavedResetClick = () => setModalType('saved');
  const handleHiddenResetClick = () => setModalType('hidden');

  const handleSavedConfirm = async () => {
    try {
      await deleteAllBookmarksMutation.mutateAsync();
      setModalType(null);
      showToast.success('저장함 목록이 삭제되었습니다.');
    } catch {
      showToast.error('저장함 목록 삭제에 실패했습니다.');
    }
  };

  const handleHiddenConfirm = async () => {
    try {
      await resetHiddenMutation.mutateAsync();
      setModalType(null);
      showToast.success('숨김 목록이 초기화되었습니다.');
    } catch {
      showToast.error('숨김 목록 초기화에 실패했습니다.');
    }
  };

  return (
    <section className='flex flex-col justify-start items-start w-full gap-3 bg-base rounded-static-frame p-5'>
      <SectionHeader text='데이터 관리' size='lg' />
      <ItemList
        label='저장함 목록 삭제'
        size='lg'
        leftIcon={Trash2}
        description='저장한 아티클 목록 및 활동 로그를 삭제합니다. (복구 불가)'
        rightButton={{
          label: '초기화하기',
          size: 'md',
          style: 'data',
          peak: false,
          onClick: handleSavedResetClick,
        }}
        className='w-full justify-between'
      />
      <ItemList
        label='숨김 목록 초기화'
        size='lg'
        leftIcon={Trash2}
        description='숨긴 아티클 목록 및 활동 로그를 삭제합니다. (복구 불가)'
        rightButton={{
          label: '초기화하기',
          size: 'md',
          style: 'data',
          peak: false,
          onClick: handleHiddenResetClick,
        }}
        className='w-full justify-between'
      />

      {modalType === 'saved' && (
        <Modal
          content={`저장한 아티클 목록을 모두 삭제할까요?\n이 작업은 복구할 수 없습니다.`}
          confirmLabel='삭제'
          onConfirm={handleSavedConfirm}
          onCancel={() => setModalType(null)}
          className='w-90'
        />
      )}
      {modalType === 'hidden' && (
        <Modal
          content={`숨긴 아티클 목록을 모두 초기화할까요?\n이 작업은 복구할 수 없습니다.`}
          confirmLabel='초기화'
          onConfirm={handleHiddenConfirm}
          onCancel={() => setModalType(null)}
          className='w-90'
        />
      )}
    </section>
  );
};
