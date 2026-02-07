import { axiosInstance } from '@/shared/api';
import { FeedSearchRequest, FeedSearchResponse } from '@/features/feed/types/api';
import { ApiResponse } from '@/shared/types';
import qs from 'qs';

// 피드 목록 조회 api
export const getFeedList = async (
  params: FeedSearchRequest,
): Promise<ApiResponse<FeedSearchResponse>> => {
  const response = await axiosInstance.get<ApiResponse<FeedSearchResponse>>('/api/cardnews', {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, {
        arrayFormat: 'repeat', // ✅ type=NEWS&type=COMMUNITY
        skipNulls: true,
      }),
  });

  return response.data;
};
