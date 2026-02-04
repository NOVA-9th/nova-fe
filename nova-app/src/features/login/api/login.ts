import { ApiResponse } from '@/shared/types';
import { AuthResponse, OAuthCallbackParams } from '@/features/login/types/api';
import { axiosInstance } from '@/shared/api';

// Google OAuth 인증 URL로 리다이렉트
export const redirectToGoogle = () => {
  if (typeof window !== 'undefined') {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  }
};

// Google OAuth 콜백 처리
export const handleGoogleCallback = async (
  params: OAuthCallbackParams,
): Promise<ApiResponse<AuthResponse>> => {
  const response = await axiosInstance.get<ApiResponse<AuthResponse>>('/auth/google/callback', {
    params,
  });
  return response.data;
};

// Kakao OAuth 인증 URL로 리다이렉트
export const redirectToKakao = () => {
  if (typeof window !== 'undefined') {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/kakao`;
  }
};

// Kakao OAuth 콜백 처리
export const handleKakaoCallback = async (
  params: OAuthCallbackParams,
): Promise<ApiResponse<AuthResponse>> => {
  const response = await axiosInstance.get<ApiResponse<AuthResponse>>('/auth/kakao/callback', {
    params,
  });
  return response.data;
};
