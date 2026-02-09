import { axiosInstance } from '@/shared/api';
import { ApiResponse } from '@/shared/types';
import { KeywordTopDTO, skilltopDTO } from '@/features/trend/api/types';
import { useSuspenseQuery } from '@tanstack/react-query';
export const getKeywordTop = async (): Promise<ApiResponse<KeywordTopDTO>> => {
  const { data } = await axiosInstance.get<ApiResponse<KeywordTopDTO>>(
    `/api/trends/keywords/keywordtop`,
  );
  return data;
};

export const useGetKeywordTop = () => {
  return useSuspenseQuery({
    queryKey: ['keywords'],
    queryFn: getKeywordTop,
    select: (res) => res.data,
  });
};

export const getInterestSkillTop = async (): Promise<ApiResponse<skilltopDTO>> => {
  const { data } = await axiosInstance.get<ApiResponse<skilltopDTO>>(
    `/api/trends/interests/skilltop`,
  );
  return data;
};

export const useGetInterestSkillTop = () => {
  return useSuspenseQuery({
    queryKey: ['interests'],
    queryFn: getInterestSkillTop,
    select: (res) => res.data,
  });
};
