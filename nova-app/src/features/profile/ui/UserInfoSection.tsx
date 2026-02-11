'use client';

import { ItemList, Modal, SectionHeader, TextIconButton, TextInput } from '@/shared/ui';
import { LogOut, RefreshCw, UserX, X } from 'lucide-react';
import Image from 'next/image';
import {
  useMemberInfo,
  useUpdateMemberName,
  useDeleteMember,
  useUploadProfileImage,
  useDeleteProfileImage,
} from '@/features/profile/hooks/useProfile';
import { useAuthStore } from '@/features/login/model/useAuthStore';
import { getProfileImageUrl } from '@/shared/utils/profileImage';
import { showToast } from '@/shared/utils/toast';
import { invalidateToken } from '@/features/login/api/login';
import { UserInfoSectionSkeleton } from '@/features/profile/ui/skeletons';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

interface UserInfoSectionProps {
  memberId: number | null;
}

export const UserInfoSection = ({ memberId }: UserInfoSectionProps) => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { data: memberInfo, isLoading, dataUpdatedAt } = useMemberInfo(memberId);
  const updateNameMutation = useUpdateMemberName();
  const deleteMemberMutation = useDeleteMember();
  const uploadImageMutation = useUploadProfileImage();
  const deleteImageMutation = useDeleteProfileImage();

  const [nameValue, setNameValue] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteImageModalOpen, setIsDeleteImageModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteMemberModalOpen, setIsDeleteMemberModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // API 데이터가 로드되면 nameValue 초기화
  useEffect(() => {
    if (memberInfo?.data) {
      setNameValue(memberInfo.data.name);
      setPreviewImage(null); // 새 데이터 로드 시 미리보기 초기화
      setSelectedFile(null);
    }
  }, [memberInfo?.data]);

  const handleDeleteMemberClick = useCallback(() => {
    if (!memberId) return;
    setIsDeleteMemberModalOpen(true);
  }, [memberId]);

  const handleConfirmDeleteMember = () => {
    if (!memberId) return;
    deleteMemberMutation.mutate(memberId, {
      onSuccess: () => {
        setIsDeleteMemberModalOpen(false);
        logout();
        showToast.success('회원 탈퇴가 완료되었습니다.');
        router.push('/login');
      },
      onError: () => {
        showToast.error('회원 탈퇴에 실패했습니다.');
      },
    });
  };

  const handleLogoutClick = useCallback(() => {
    setIsLogoutModalOpen(true);
  }, []);

  const handleConfirmLogout = async () => {
    setIsLogoutModalOpen(false);

    // 토큰 무효화 API 호출 (실패해도 로그아웃은 진행)
    try {
      await invalidateToken();
    } catch (error) {
      // 토큰 무효화 실패해도 로그아웃은 진행
      console.error('토큰 무효화 실패:', error);
    }

    logout();
    showToast.success('로그아웃 되었습니다.');
    router.push('/login');
  };

  const handleImageClick = () => {
    // 저장 중일 때는 파일 선택 비활성화
    if (isSaving || updateNameMutation.isPending || uploadImageMutation.isPending) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // JPG, PNG만 허용
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      showToast.error('JPG, PNG 형식만 업로드 가능합니다.');
      e.target.value = '';
      return;
    }

    // 용량 8MB 미만
    const maxSize = 8 * 1024 * 1024;
    if (file.size >= maxSize) {
      showToast.error('파일 크기는 8MB 미만이어야 합니다.');
      e.target.value = '';
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.onerror = () => {
      showToast.error('이미지를 불러올 수 없습니다.');
      setSelectedFile(null);
      e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  const handleSave = useCallback(() => {
    if (!memberId || isSaving || updateNameMutation.isPending || uploadImageMutation.isPending) {
      return;
    }

    const hasNameChanged =
      nameValue.trim() !== (memberInfo?.data?.name || '') && nameValue.trim() !== '';
    const hasSelectedFile = !!selectedFile;

    if (!hasNameChanged && !hasSelectedFile) return;

    setIsSaving(true);

    const promises: Promise<any>[] = [];

    if (hasNameChanged) {
      promises.push(
        new Promise((resolve, reject) => {
          updateNameMutation.mutate(
            {
              memberId,
              requestDto: { name: nameValue.trim() },
            },
            {
              onSuccess: () => {
                showToast.success('이름이 변경되었습니다.');
                resolve(undefined);
              },
              onError: () => {
                showToast.error('이름 변경에 실패했습니다.');
                reject();
              },
            },
          );
        }),
      );
    }

    if (hasSelectedFile && selectedFile) {
      promises.push(
        new Promise((resolve, reject) => {
          uploadImageMutation.mutate(
            { memberId, file: selectedFile },
            {
              onSuccess: () => {
                setPreviewImage(null);
                setSelectedFile(null);
                fileInputRef.current!.value = '';
                showToast.success('프로필 이미지가 변경되었습니다.');
                resolve(undefined);
              },
              onError: () => {
                showToast.error('이미지 업로드에 실패했습니다.');
                reject();
              },
            },
          );
        }),
      );
    }

    Promise.all(promises).finally(() => {
      setIsSaving(false);
    });
  }, [
    memberId,
    isSaving,
    nameValue,
    selectedFile,
    memberInfo?.data?.name,
    updateNameMutation,
    uploadImageMutation,
  ]);

  const handleImageDeleteClick = () => {
    if (!memberId) return;
    // previewImage를 우선시하고, 빈 문자열도 falsy로 처리
    const hasImage = previewImage || memberInfo?.data?.profileImage;
    if (!hasImage) return;
    setIsDeleteImageModalOpen(true);
  };

  const handleConfirmImageDelete = () => {
    if (!memberId) return;
    setIsDeleteImageModalOpen(false);

    // 로컬 미리보기 이미지만 있는 경우 (아직 업로드되지 않은 파일)
    if (selectedFile || previewImage) {
      // 서버 API 호출 없이 로컬 상태만 클리어
      setPreviewImage(null);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      showToast.success('프로필 이미지가 삭제되었습니다.');
      return;
    }

    // 서버에 업로드된 이미지가 있는 경우에만 API 호출
    deleteImageMutation.mutate(memberId, {
      onSuccess: () => {
        setPreviewImage(null);
        setSelectedFile(null);
        showToast.success('프로필 이미지가 삭제되었습니다.');
      },
      onError: () => {
        showToast.error('이미지 삭제에 실패했습니다.');
      },
    });
  };

  const hasNameChanged = useMemo(() => {
    if (!memberInfo?.data?.name) return false;
    const trimmed = nameValue.trim();
    return trimmed !== '' && trimmed !== memberInfo.data.name;
  }, [nameValue]);

  const hasChanges = useMemo(() => {
    return hasNameChanged || !!selectedFile;
  }, [hasNameChanged, selectedFile]);

  if (isLoading) {
    return <UserInfoSectionSkeleton />;
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
        <div className='flex w-full items-center justify-start p-2 gap-1'>
          <div
            className={`relative ${
              isSaving || updateNameMutation.isPending || uploadImageMutation.isPending
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer'
            }`}
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
              src={previewImage || getProfileImageUrl(profileImage, dataUpdatedAt) || '/test.png'}
              alt='User Profile'
              width={200}
              height={200}
              className='rounded-full size-12 object-cover'
            />
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              disabled={isSaving || updateNameMutation.isPending || uploadImageMutation.isPending}
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
              !(previewImage || profileImage) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleImageDeleteClick}
          />
          <TextIconButton
            label='변경'
            size='lg'
            style='surface'
            peak={hasChanges}
            leftIcon={RefreshCw}
            className='w-full gap-1.5'
            onClick={handleSave}
            disabled={
              !hasChanges ||
              isSaving ||
              updateNameMutation.isPending ||
              uploadImageMutation.isPending
            }
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
            disabled
            className='w-full opacity-50 cursor-not-allowed disabled:'
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
            onClick={handleDeleteMemberClick}
          />
          <TextIconButton
            label='로그아웃'
            size='lg'
            style='surface'
            peak={false}
            leftIcon={LogOut}
            className='w-full gap-1.5'
            onClick={handleLogoutClick}
          />
        </div>
      </div>
      {isDeleteImageModalOpen && (
        <Modal
          content='이미지를 삭제하겠습니까?'
          onCancel={() => setIsDeleteImageModalOpen(false)}
          onConfirm={handleConfirmImageDelete}
        />
      )}
      {isLogoutModalOpen && (
        <Modal
          content='로그아웃 하시겠습니까?'
          onCancel={() => setIsLogoutModalOpen(false)}
          onConfirm={handleConfirmLogout}
        />
      )}
      {isDeleteMemberModalOpen && (
        <Modal
          content={`정말 회원 탈퇴를 하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`}
          confirmLabel='탈퇴'
          onCancel={() => setIsDeleteMemberModalOpen(false)}
          onConfirm={handleConfirmDeleteMember}
          className='w-90'
        />
      )}
    </section>
  );
};
