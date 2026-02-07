import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMemberInfo,
  updateMemberName,
  deleteMember,
  getConnectedAccounts,
  getPersonalization,
  updatePersonalization,
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

