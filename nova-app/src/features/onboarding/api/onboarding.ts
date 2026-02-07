import { axiosInstance } from '@/shared/api';
import { ApiResponse } from '@/shared/types';
import { MemberPersonalizationDto } from '../types/api';

export const getPersonalization = async (memberId: number) => {
  const response = await axiosInstance.get<ApiResponse<MemberPersonalizationDto>>(
    `/api/members/${memberId}/personalization`,
  );
  return response.data.data;
};
