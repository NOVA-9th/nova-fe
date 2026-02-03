/**
 * 인증 응답 DTO
 */
export type AuthResponse = {
  accessToken: string;
  memberId: number;
  email: string;
  name: string;
};

/**
 * OAuth 콜백 요청 파라미터
 */
export type OAuthCallbackParams = {
  code: string;
};
