'use client';

import { ItemList, SectionHeader, TextIconButton, TextInput } from '@/shared/ui';
import { LogOut, RefreshCw, UserX, X } from 'lucide-react';
import Image from 'next/image';
import {
  useMemberInfo,
  useUpdateMemberName,
  useDeleteMember,
  useUploadProfileImage,
  useDeleteProfileImage,
} from '../hooks/useProfile';
import { useAuthStore } from '@/features/login/model/useAuthStore';
import { useState, useEffect, useRef } from 'react';
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
  const uploadImageMutation = useUploadProfileImage();
  const deleteImageMutation = useDeleteProfileImage();

  const [nameValue, setNameValue] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // API 데이터가 로드되면 nameValue 초기화
  useEffect(() => {
    if (memberInfo?.data) {
      setNameValue(memberInfo.data.name);
      setPreviewImage(null); // 새 데이터 로드 시 미리보기 초기화
      setSelectedFile(null);
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

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 유효성 검사
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      // 파일 크기 제한 (예: 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      setSelectedFile(file);
      // 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!memberId) return;

    const promises: Promise<any>[] = [];

    // 이름이 변경되었으면 저장
    if (hasNameChanged && nameValue.trim()) {
      promises.push(
        new Promise((resolve, reject) => {
          updateNameMutation.mutate(
            {
              memberId,
              requestDto: { name: nameValue.trim() },
            },
            {
              onSuccess: resolve,
              onError: reject,
            }
          );
        })
      );
    }

    // 이미지가 선택되었으면 업로드
    if (selectedFile) {
      promises.push(
        new Promise((resolve, reject) => {
          uploadImageMutation.mutate(
            { memberId, file: selectedFile },
            {
              onSuccess: () => {
                setPreviewImage(null);
                setSelectedFile(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
                resolve(undefined);
              },
              onError: reject,
            }
          );
        })
      );
    }

    // 둘 다 없으면 실행하지 않음
    if (promises.length === 0) return;

    // 모든 저장 작업 완료 대기
    Promise.all(promises).catch((error) => {
      console.error('저장 중 오류 발생:', error);
    });
  };

  const handleImageDelete = () => {
    if (!memberId) return;

    if (confirm('프로필 이미지를 삭제하시겠습니까?')) {
      deleteImageMutation.mutate(memberId, {
        onSuccess: () => {
          setPreviewImage(null);
          setSelectedFile(null);
        },
      });
    }
  };

  // 이름이 변경되었는지 확인 (빈 문자열이 아닌 경우만)
  const hasNameChanged = nameValue.trim() !== (memberInfo?.data?.name || '') && nameValue.trim() !== '';

  // 저장할 내용이 있는지 확인 (이름 변경 또는 이미지 선택)
  const hasChanges = (hasNameChanged && nameValue.trim() !== '') || !!selectedFile;

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
          <div
            className='relative cursor-pointer'
            onClick={handleImageClick}
            role='button'
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleImageClick();
              }
            }}
          >
            <Image
              src={previewImage || profileImage || '/test.png'}
              alt='User Profile'
              width={48}
              height={48}
              className='rounded-full object-cover bg-black'
            />
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              className='hidden'
            />
          </div>
          <ItemList size='lg' label={name} description={email} />
        </div>
        <div className='flex w-full gap-2'>
          <TextIconButton
            label='이미지 삭제'
            size='lg'
            style='data'
            peak={false}
            leftIcon={X}
            className={`w-full gap-1.5 ${
              !profileImage && !previewImage ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleImageDelete}
          />
          <TextIconButton
            label='변경'
            size='lg'
            style='surface'
            peak={hasChanges}
            leftIcon={RefreshCw}
            className={`w-full gap-1.5 ${
              !hasChanges ||
              updateNameMutation.isPending ||
              uploadImageMutation.isPending
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onClick={handleSave}
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
