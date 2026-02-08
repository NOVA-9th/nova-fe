import { axiosInstance } from '@/shared/api';
import { ApiResponse } from '@/shared/types';
import {
  MemberRequestDto,
  MemberResponseDto,
  MemberUpdateResponseDto,
  MemberPersonalizationDto,
  MemberConnectedAccountsResponseDto,
  MemberLevel,
} from './types';

export type {
  MemberRequestDto,
  MemberResponseDto,
  MemberUpdateResponseDto,
  MemberPersonalizationDto,
  MemberConnectedAccountsResponseDto,
} from './types';

export { MemberLevel } from './types';

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

/**
 * 멤버 삭제
 * @param memberId 멤버 ID
 */
export const deleteMember = async (
  memberId: number
): Promise<ApiResponse<void>> => {
  const response = await axiosInstance.delete<ApiResponse<void>>(
    `/api/members/${memberId}`
  );
  return response.data;
};

/**
 * 멤버 개인화 설정 조회
 * @param memberId 멤버 ID
 */
export const getPersonalization = async (
  memberId: number
): Promise<ApiResponse<MemberPersonalizationDto>> => {
  const response = await axiosInstance.get<ApiResponse<MemberPersonalizationDto>>(
    `/api/members/${memberId}/personalization`
  );
  return response.data;
};

/**
 * 멤버 개인화 설정 수정
 * @param memberId 멤버 ID
 * @param requestDto 개인화 설정 정보
 */
export const updatePersonalization = async (
  memberId: number,
  requestDto: MemberPersonalizationDto
): Promise<ApiResponse<void>> => {
  const response = await axiosInstance.put<ApiResponse<void>>(
    `/api/members/${memberId}/personalization`,
    requestDto
  );
  return response.data;
};

/**
 * 연결된 계정 조회
 * @param memberId 멤버 ID
 */
export const getConnectedAccounts = async (
  memberId: number
): Promise<ApiResponse<MemberConnectedAccountsResponseDto>> => {
  const response = await axiosInstance.get<ApiResponse<MemberConnectedAccountsResponseDto>>(
    `/api/members/${memberId}/connected-accounts`
  );
  return response.data;
};

/**
 * 프로필 이미지 조회
 * @param memberId 멤버 ID
 * @returns 이미지 Blob 또는 null
 */
export const getProfileImage = async (
  memberId: number
): Promise<Blob | null> => {
  try {
    const response = await axiosInstance.get(`/api/members/${memberId}/profile-image`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error: any) {
    // 404 Not Found인 경우 null 반환
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

/**
 * 프로필 이미지 업로드
 * @param memberId 멤버 ID
 * @param file 이미지 파일
 */
export const uploadProfileImage = async (
  memberId: number,
  file: File
): Promise<ApiResponse<void>> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post<ApiResponse<void>>(
    `/api/members/${memberId}/profile-image`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

/**
 * 프로필 이미지 삭제
 * @param memberId 멤버 ID
 */
export const deleteProfileImage = async (
  memberId: number
): Promise<ApiResponse<void>> => {
  const response = await axiosInstance.delete<ApiResponse<void>>(
    `/api/members/${memberId}/profile-image`
  );
  return response.data;
};

