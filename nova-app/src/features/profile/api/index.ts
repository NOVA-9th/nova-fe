import { axiosInstance } from '@/shared/api';
import { ApiResponse } from '@/shared/types';
import {
  MemberRequestDto,
  MemberResponseDto,
  MemberUpdateResponseDto,
} from './types';

/**
 * 멤버 정보 조회
 * @param memberId 멤버 ID
 */
export const getMemberInfo = async (
  memberId: number
): Promise<ApiResponse<MemberResponseDto>> => {
  const response = await axiosInstance.get<ApiResponse<MemberResponseDto>>(
    `/api/members/${memberId}`
  );
  return response.data;
};

/**
 * 멤버 이름 수정
 * @param memberId 멤버 ID
 * @param requestDto 수정할 이름 정보
 */
export const updateMemberName = async (
  memberId: number,
  requestDto: MemberRequestDto
): Promise<ApiResponse<MemberUpdateResponseDto>> => {
  const response = await axiosInstance.patch<ApiResponse<MemberUpdateResponseDto>>(
    `/api/members/${memberId}`,
    requestDto
  );
  return response.data;
};

