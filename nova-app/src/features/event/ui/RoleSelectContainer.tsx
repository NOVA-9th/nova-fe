'use client';

import { Header, ToggleButton } from '@/shared/ui';
import { useCallback } from 'react';
import { useEventStore, type Role } from '@/features/event/model/useEventStore';

const roles: { label: string; value: Role }[] = [
  { label: 'PM', value: 'PM' },
  { label: '디자이너', value: 'DESIGN' },
  { label: '프론트엔드', value: 'FE' },
  { label: '백엔드', value: 'BE' },
];

export const RoleSelectContainer = () => {
  const setRole = useEventStore((s) => s.setRole);

  const handlePick = useCallback((role: Role) => setRole(role), [setRole]);

  return (
    <main className='flex flex-col w-full gap-5 px-7 py-5 bg-base rounded-static-frame sm:px-10 sm:py-7.5'>
      <Header
        size='lg'
        label='관심있는 직무를 선택해주세요 !'
        description='맞춘 문제에 따라 룰렛 돌리기 기회가 주어집니다 ~'
        className='items-center'
      />

      <div className='grid grid-cols-2 gap-3'>
        {roles.map((r) => (
          <ToggleButton
            key={r.value}
            variant='outline'
            size='lg'
            value={r.value}
            text={r.label}
            onClick={() => handlePick(r.value)}
            className='w-full'
          />
        ))}
      </div>
    </main>
  );
};
