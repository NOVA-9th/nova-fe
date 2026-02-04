export type AuthResponse = {
  accessToken: string;
  memberId: number;
  email: string;
  name: string;
};

export type OAuthCallbackParams = {
  code: string;
};
