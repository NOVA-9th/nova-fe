import { axiosInstance } from '@/shared/api';
import { ApiResponse } from '@/shared/types';
import {
  KeywordPersonalizationDto,
  MemberPersonalizationDto,
} from '@/features/onboarding/types/api';

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

export const getKeywords = async () => {
  try {
    const response =
      await axiosInstance.get<ApiResponse<KeywordPersonalizationDto>>(`/api/keywords`);
    return response.data.data ?? [];
  } catch (error) {
    console.error('getKeywords 호출 중 오류:', error);
    return [];
  }
};
