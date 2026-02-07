import { axiosInstance } from '@/shared/api';
import { ApiResponse } from '@/shared/types';
import { MemberPersonalizationDto } from '../types/api';

export const getPersonalization = async (
  memberId: number,
): Promise<MemberPersonalizationDto | null> => {
  try {
    const response = await axiosInstance.get<ApiResponse<MemberPersonalizationDto>>(
      `/api/members/${memberId}/personalization`,
    );

    return response.data.data ?? null; // 데이터가 없으면 null 반환
  } catch (error) {
    console.error('getPersonalization 호출 중 오류:', error);
    return null;
  }
};
