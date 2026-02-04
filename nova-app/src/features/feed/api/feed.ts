import { axiosInstance } from '@/shared/api';
import { FeedSearchRequest, FeedSearchResponse } from '@/features/feed/types/api';
import { ApiResponse } from '@/shared/types';

// 피드 목록 조회 api
export const getFeedList = async (
  params: FeedSearchRequest,
): Promise<ApiResponse<FeedSearchResponse>> => {
  const response = await axiosInstance.get<ApiResponse<FeedSearchResponse>>('/api/cardnews', {
    params,
  });

  return response.data;
};
