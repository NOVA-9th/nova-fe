import { axiosInstance } from '@/shared/api';
import { ApiResponse } from '@/shared/types';
import { AuthResponse, OAuthCallbackParams } from './types';

/**
 * Google OAuth 인증 URL로 리다이렉트
 */
export const redirectToGoogle = () => {
  if (typeof window !== 'undefined') {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'}/auth/google`;
  }
};

/**
 * Google OAuth 콜백 처리
 */
export const handleGoogleCallback = async (
  params: OAuthCallbackParams
): Promise<ApiResponse<AuthResponse>> => {
  const response = await axiosInstance.get<ApiResponse<AuthResponse>>('/auth/google/callback', {
    params,
  });
  return response.data;
};

/**
 * Kakao OAuth 인증 URL로 리다이렉트
 */
export const redirectToKakao = () => {
  if (typeof window !== 'undefined') {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'}/auth/kakao`;
  }
};

/**
 * Kakao OAuth 콜백 처리
 */
export const handleKakaoCallback = async (
  params: OAuthCallbackParams
): Promise<ApiResponse<AuthResponse>> => {
  const response = await axiosInstance.get<ApiResponse<AuthResponse>>('/auth/kakao/callback', {
    params,
  });
  return response.data;
};

/**
 * 현재 로그인한 사용자 정보 조회 (테스트용)
 */
export const getCurrentUser = async (): Promise<ApiResponse<any>> => {
  const response = await axiosInstance.get<ApiResponse<any>>('/auth/test/me');
  return response.data;
};

/**
 * 테스트 토큰 발급 (테스트용)
 * @param userId 토큰 발급 대상 사용자 ID (null이면 비회원 토큰)
 */
export const generateTestToken = async (
  userId: number | null
): Promise<ApiResponse<AuthResponse>> => {
  const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
    '/auth/test/token',
    userId
  );
  return response.data;
};

/**
 * 테스트 사용자 생성 (테스트용)
 */
export const createTestUser = async (): Promise<ApiResponse<any>> => {
  const response = await axiosInstance.post<ApiResponse<any>>('/auth/test/create-test-user');
  return response.data;
};

