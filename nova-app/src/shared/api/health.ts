import { axiosInstance } from './axios';
import { ApiResponse } from '../types/api';

/**
 * 서버 Health Check
 */
export const healthCheck = async (): Promise<ApiResponse<string>> => {
  const response = await axiosInstance.get<ApiResponse<string>>('/health');
  return response.data;
};

