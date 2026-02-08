import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMemberInfo,
  updateMemberName,
  deleteMember,
  getConnectedAccounts,
  getPersonalization,
  updatePersonalization,
  getProfileImage,
  uploadProfileImage,
  deleteProfileImage,
  type MemberRequestDto,
  type MemberPersonalizationDto,
} from '../api/profile';

/**
 * 멤버 정보 조회
 */
export const useMemberInfo = (memberId: number | null) => {
  return useQuery({
    queryKey: ['member', memberId],
    queryFn: () => getMemberInfo(memberId!),
    enabled: memberId !== null,
  });
};

/**
 * 멤버 이름 수정
 */
export const useUpdateMemberName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ memberId, requestDto }: { memberId: number; requestDto: MemberRequestDto }) =>
      updateMemberName(memberId, requestDto),
    onSuccess: (_, variables) => {
      // 멤버 정보 캐시 무효화하여 자동 refetch
      queryClient.invalidateQueries({ queryKey: ['member', variables.memberId] });
    },
  });
};

/**
 * 멤버 삭제
 */
export const useDeleteMember = () => {
  return useMutation({
    mutationFn: (memberId: number) => deleteMember(memberId),
  });
};

/**
 * 연결된 계정 조회
 */
export const useConnectedAccounts = (memberId: number | null) => {
  return useQuery({
    queryKey: ['connectedAccounts', memberId],
    queryFn: () => getConnectedAccounts(memberId!),
    enabled: memberId !== null,
  });
};

/**
 * 개인화 설정 조회
 */
export const usePersonalization = (memberId: number | null) => {
  return useQuery({
    queryKey: ['personalization', memberId],
    queryFn: () => getPersonalization(memberId!),
    enabled: memberId !== null,
  });
};

/**
 * 개인화 설정 수정
 */
export const useUpdatePersonalization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      memberId,
      requestDto,
    }: {
      memberId: number;
      requestDto: MemberPersonalizationDto;
    }) => updatePersonalization(memberId, requestDto),
    onSuccess: (_, variables) => {
      // 개인화 설정 캐시 무효화하여 자동 refetch
      queryClient.invalidateQueries({ queryKey: ['personalization', variables.memberId] });
    },
  });
};

/**
 * 프로필 이미지 조회
 */
export const useProfileImage = (memberId: number | null) => {
  return useQuery({
    queryKey: ['profileImage', memberId],
    queryFn: () => getProfileImage(memberId!),
    enabled: memberId !== null,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};

/**
 * 프로필 이미지 업로드
 */
export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ memberId, file }: { memberId: number; file: File }) =>
      uploadProfileImage(memberId, file),
    onSuccess: (_, variables) => {
      // 멤버 정보 및 프로필 이미지 캐시 무효화하여 자동 refetch
      queryClient.invalidateQueries({ queryKey: ['member', variables.memberId] });
      queryClient.invalidateQueries({ queryKey: ['profileImage', variables.memberId] });
    },
  });
};

/**
 * 프로필 이미지 삭제
 */
export const useDeleteProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: number) => deleteProfileImage(memberId),
    onSuccess: (_, memberId) => {
      // 멤버 정보 및 프로필 이미지 캐시 무효화하여 자동 refetch
      queryClient.invalidateQueries({ queryKey: ['member', memberId] });
      queryClient.invalidateQueries({ queryKey: ['profileImage', memberId] });
    },
  });
};

