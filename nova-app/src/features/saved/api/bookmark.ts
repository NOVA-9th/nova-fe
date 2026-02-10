import { axiosInstance } from '@/shared/api/axios';
import type { ApiResponse } from '@/shared/types/api';
import type {
  BookmarkCountsByInterestResponse,
  BookmarkCountsBySourceTypeResponse,
} from '../types/api';

/**
 * 관심사별 북마크 개수 조회
 */
export const getBookmarkCountsByInterest =
  async (): Promise<ApiResponse<BookmarkCountsByInterestResponse>> => {
    const response = await axiosInstance.get<ApiResponse<BookmarkCountsByInterestResponse>>(
      '/api/bookmarks/interests/counts',
    );
    return response.data;
  };

/**
 * 출처별 북마크 개수 조회
 */
export const getBookmarkCountsBySourceType =
  async (): Promise<ApiResponse<BookmarkCountsBySourceTypeResponse>> => {
    const response = await axiosInstance.get<ApiResponse<BookmarkCountsBySourceTypeResponse>>(
      '/api/bookmarks/sourcetype/counts',
    );
    return response.data;
  };

