import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { ApiResponse } from '../types/api';

// API Base URL - 환경 변수로 관리하거나 기본값 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

// AxiosInstance 생성
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - 토큰 자동 추가
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 로컬 스토리지나 쿠키에서 토큰 가져오기
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - 에러 처리
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<ApiResponse<null>>) => {
    // 401 Unauthorized - 토큰 만료 또는 인증 실패
    if (error.response?.status === 401) {
      // 토큰 제거 및 로그인 페이지로 리다이렉트
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        // 필요시 로그인 페이지로 리다이렉트
        // window.location.href = '/login';
      }
    }

    // 403 Forbidden
    if (error.response?.status === 403) {
      // 권한 없음 처리
      console.error('접근 권한이 없습니다.');
    }

    // 500 Internal Server Error
    if (error.response?.status === 500) {
      console.error('서버 내부 오류가 발생했습니다.');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

