'use client';

import { ItemList, SectionHeader, TextIconButton, TextInput } from '@/shared/ui';
import { LogOut, RefreshCw, UserX, X } from 'lucide-react';
import Image from 'next/image';
import { useMemberInfo, useUpdateMemberName, useDeleteMember } from '../hooks/useProfile';
import { useAuthStore } from '@/features/login/model/useAuthStore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UserInfoSectionProps {
  memberId: number | null;
}

export const UserInfoSection = ({ memberId }: UserInfoSectionProps) => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { data: memberInfo, isLoading } = useMemberInfo(memberId);
  const updateNameMutation = useUpdateMemberName();
  const deleteMemberMutation = useDeleteMember();

  const [nameValue, setNameValue] = useState('');

  // API 데이터가 로드되면 nameValue 초기화
  useEffect(() => {
    if (memberInfo?.data) {
      setNameValue(memberInfo.data.name);
    }
  }, [memberInfo?.data]);

  const handleNameUpdate = () => {
    if (!memberId || !nameValue.trim()) return;

    updateNameMutation.mutate(
      {
        memberId,
        requestDto: { name: nameValue.trim() },
      },
      {
        onSuccess: () => {
          // 성공 시 처리 (캐시 자동 업데이트됨)
        },
      }
    );
  };

  const handleDeleteMember = () => {
    if (!memberId) return;

    if (confirm('정말 회원 탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      deleteMemberMutation.mutate(memberId, {
        onSuccess: () => {
          logout();
          router.push('/');
        },
      });
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <section className='flex flex-col justify-start items-start w-full gap-5 bg-base rounded-static-frame p-5'>
        <SectionHeader text='사용자 정보' size='lg' />
        <div className='text-optional'>로딩 중...</div>
      </section>
    );
  }

  if (!memberInfo?.data) {
    return (
      <section className='flex flex-col justify-start items-start w-full gap-5 bg-base rounded-static-frame p-5'>
        <SectionHeader text='사용자 정보' size='lg' />
        <div className='text-optional'>사용자 정보를 불러올 수 없습니다.</div>
      </section>
    );
  }

  const { name, email, profileImage } = memberInfo.data;
  return (
    <section className='flex flex-col justify-start items-start w-full gap-5 bg-base rounded-static-frame p-5'>
      <SectionHeader text='사용자 정보' size='lg' />
      <div className='flex flex-col w-full items-center justify-start gap-2'>
        <div className='flex w-full items-center justify-start p-2 gap-2'>
          <Image
            src={profileImage || '/test.png'}
            alt='User Profile'
            width={48}
            height={48}
            className='rounded-full object-cover bg-black'
          />
          <ItemList size='lg' label={name} description={email} />
        </div>
        <div className='flex w-full gap-2'>
          <TextIconButton
            label='이미지 삭제'
            size='lg'
            style='data'
            peak={false}
            leftIcon={X}
            className='w-full gap-1.5'
            onClick={() => {
              if (!profileImage) return;
              // TODO: 이미지 삭제 기능 구현
            }}
          />
          <TextIconButton
            label='변경'
            size='lg'
            style='surface'
            peak={false}
            leftIcon={RefreshCw}
            className='w-full gap-1.5'
            onClick={() => {
              if (!profileImage) return;
              // TODO: 이미지 변경 기능 구현
            }}
          />
        </div>
      </div>
      <div className='flex flex-col justify-start items-start w-full gap-5'>
        <div className='flex flex-col justify-start items-start w-full gap-2'>
          <SectionHeader text='이름' />
          <TextInput
            size='lg'
            variant='surface'
            data={false}
            value={nameValue}
            onChange={(value) => setNameValue(value)}
            placeholder={name}
            className='w-full'
          />
          <TextIconButton
            label='이름 저장'
            size='md'
            style='surface'
            peak={true}
            leftIcon={RefreshCw}
            onClick={handleNameUpdate}
            className={`w-full gap-1.5 ${
              updateNameMutation.isPending || nameValue.trim() === name
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          />
        </div>
        <div className='flex flex-col justify-start items-start w-full gap-2'>
          <SectionHeader text='이메일' />
          <TextInput
            size='lg'
            variant='surface'
            data={false}
            value={email}
            onChange={() => {}}
            placeholder={email}
            className='w-full opacity-50 cursor-not-allowed'
          />
        </div>
        <div className='flex justify-between items-center w-full gap-4'>
          <TextIconButton
            label='회원 탈퇴'
            size='lg'
            style='surface'
            peak={false}
            leftIcon={UserX}
            className={`w-full gap-1.5 ${
              deleteMemberMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleDeleteMember}
          />
          <TextIconButton
            label='로그아웃'
            size='lg'
            style='surface'
            peak={false}
            leftIcon={LogOut}
            className='w-full gap-1.5'
            onClick={handleLogout}
          />
        </div>
      </div>
    </section>
  );
};
