import { axiosInstance } from '@/shared/api';
import { ApiResponse } from '@/shared/types';
import { KeywordPersonalizationDto } from '@/features/onboarding/types/api';

export const getKeywords = async () => {
  const response = await axiosInstance.get<ApiResponse<KeywordPersonalizationDto>>(`/api/keywords`);
  return response.data.data ?? [];
};
