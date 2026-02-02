/**
 * 인증 응답 DTO
 */
export interface AuthResponse {
  accessToken: string;
  memberId: number;
  email: string;
  name: string;
}

/**
 * OAuth 콜백 요청 파라미터
 */
export interface OAuthCallbackParams {
  code: string;
}

