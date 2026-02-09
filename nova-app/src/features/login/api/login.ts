import { ApiResponse } from '@/shared/types';
import { AuthResponse, OAuthCallbackParams } from '@/features/login/types/api';
import { axiosInstance } from '@/shared/api';

// Google OAuth 인증 URL로 리다이렉트
export const redirectToGoogle = (state: 'login' | 'connect' = 'login') => {
  if (typeof window === 'undefined') return;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    console.error('NEXT_PUBLIC_API_BASE_URL 이 정의되어있지 않습니다.');
    return;
  }

  window.location.href = `${baseUrl}/auth/google?state=${state}`;
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

// Google OAuth 연결 처리
export const handleGoogleConnect = async (
  params: OAuthCallbackParams,
): Promise<ApiResponse<null>> => {
  const response = await axiosInstance.post<ApiResponse<null>>('/auth/google/connect', null, {
    params,
  });
  return response.data;
};

// Kakao OAuth 인증 URL로 리다이렉트
export const redirectToKakao = (state: 'login' | 'connect' = 'login') => {
  if (typeof window === 'undefined') return;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    console.error('NEXT_PUBLIC_API_BASE_URL 이 정의되어있지 않습니다.');
    return;
  }

  window.location.href = `${baseUrl}/auth/kakao?state=${state}`;
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

// Kakao OAuth 연결 처리
export const handleKakaoConnect = async (
  params: OAuthCallbackParams,
): Promise<ApiResponse<null>> => {
  const response = await axiosInstance.post<ApiResponse<null>>('/auth/kakao/connect', null, {
    params,
  });
  return response.data;
};

// GitHub OAuth 인증 URL로 리다이렉트
export const redirectToGithub = (state: 'login' | 'connect' = 'login') => {
  if (typeof window === 'undefined') return;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    console.error('NEXT_PUBLIC_API_BASE_URL 이 정의되어있지 않습니다.');
    return;
  }

  window.location.href = `${baseUrl}/auth/github?state=${state}`;
};

// GitHub OAuth 콜백 처리
export const handleGithubCallback = async (
  params: OAuthCallbackParams,
): Promise<ApiResponse<AuthResponse>> => {
  const response = await axiosInstance.get<ApiResponse<AuthResponse>>('/auth/github/callback', {
    params,
  });
  return response.data;
};

// GitHub OAuth 연결 처리
export const handleGithubConnect = async (
  params: OAuthCallbackParams,
): Promise<ApiResponse<null>> => {
  const response = await axiosInstance.post<ApiResponse<null>>('/auth/github/connect', null, {
    params,
  });
  return response.data;
};

// 토큰 무효화
export const invalidateToken = async (): Promise<ApiResponse<null>> => {
  const response = await axiosInstance.post<ApiResponse<null>>('/auth/invalidate');
  return response.data;
};