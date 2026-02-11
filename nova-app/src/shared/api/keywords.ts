import { axiosInstance } from '@/shared/api';
import { ApiResponse, MemberKeywordsResponse } from '@/shared/types';

export const getMemberKeywords = async (member_id: number) => {
  const response = await axiosInstance.get<ApiResponse<MemberKeywordsResponse>>(
    `/api/members/${member_id}/keywords`,
  );

  return response.data;
};
