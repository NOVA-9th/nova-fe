import { axiosInstance } from '@/shared/api';
import { FeedSearchRequest, FeedSearchResponse, SearchFeedParams } from '@/features/feed/types/api';
import { ApiResponse } from '@/shared/types';
import qs from 'qs';

// 피드 목록 조회
export const getFeedList = async (
  params: FeedSearchRequest,
): Promise<ApiResponse<FeedSearchResponse>> => {
  const response = await axiosInstance.get<ApiResponse<FeedSearchResponse>>('/api/cardnews', {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, {
        arrayFormat: 'repeat',
        skipNulls: true,
      }),
  });

  return response.data;
};

// 카드뉴스 숨기기
export const postHiddenFeed = async (cardNewsId: number) => {
  const response = await axiosInstance.post<ApiResponse<void>>(
    `/api/cardnews/${cardNewsId}/hidden`,
  );

  return response.data;
};

// 피드 목록 검색 조회
export const getSearchFeedList = async ({ searchKeyword, pageable }: SearchFeedParams) => {
  const response = await axiosInstance.get<ApiResponse<FeedSearchResponse>>(
    '/api/bookmarks/search',
    {
      params: {
        ...(searchKeyword && { searchKeyword }),
        page: pageable.page,
        size: pageable.size,
        sort: pageable.sort,
      },
    },
  );

  return response.data;
};
