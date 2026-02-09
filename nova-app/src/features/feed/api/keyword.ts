import { axiosInstance } from '@/shared/api';
import { ApiResponse } from '@/shared/types';
import { KeywordsResponse } from '../types/api';

export const getKeywords = async () => {
  const response = await axiosInstance.get<ApiResponse<KeywordsResponse>>(`/api/keywords`);

  return response.data;
};
