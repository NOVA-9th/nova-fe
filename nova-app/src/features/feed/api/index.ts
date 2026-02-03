import { axiosInstance } from '@/shared/api';
import { FeedSearchRequest, FeedSearchResponse } from './types';
import { ApiResponse } from '@/shared/types';

export const getFeedList = async (
  params: FeedSearchRequest,
): Promise<ApiResponse<FeedSearchResponse>> => {
  const response = await axiosInstance.get<ApiResponse<FeedSearchResponse>>('/api/cardnews', {
    params,
  });

  return response.data;
};
