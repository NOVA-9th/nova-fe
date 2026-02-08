import { axiosInstance } from '@/shared/api';
import { ApiResponse } from '@/shared/types';

// 북마크 생성
export const postBookmark = async (cardnewsId: number) => {
  const response = await axiosInstance.post<ApiResponse<void>>(`/api/bookmarks/${cardnewsId}`);

  return response.data;
};

// 북마크 삭제
export const deleteBookmark = async (cardnewsId: number) => {
  const response = await axiosInstance.delete<ApiResponse<void>>(`/api/bookmarks/${cardnewsId}`);

  return response.data;
};
