export type AuthResponse = {
  accessToken: string;
  memberId: number;
  email: string | null;
  name: string;
};

export type OAuthCallbackParams = {
  code: string;
};
