import { axiosInstance } from '@/shared/api';
import { ApiSuccessResponse } from '@/shared/types';
import { KeywordTopDTO, skilltopDTO } from '@/features/trend/types/api';
export const getKeywordTop = async (): Promise<ApiSuccessResponse<KeywordTopDTO>> => {
  const { data } = await axiosInstance.get<ApiSuccessResponse<KeywordTopDTO>>(
    `/api/trends/keywords/keywordtop`,
  );
  return data;
};

export const getInterestSkillTop = async (): Promise<ApiSuccessResponse<skilltopDTO>> => {
  const { data } = await axiosInstance.get<ApiSuccessResponse<skilltopDTO>>(
    `/api/trends/interests/skilltop`,
  );
  return data;
};
