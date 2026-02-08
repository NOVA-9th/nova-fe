/**
 * 멤버 정보 요청 DTO
 */
export type MemberRequestDto = {
  name: string;
};

/**
 * 멤버 정보 응답 DTO
 */
export type MemberResponseDto = {
  id: number;
  name: string;
  email: string;
  profileImage: string | null;
};

/**
 * 멤버 정보 수정 응답 DTO
 */
export type MemberUpdateResponseDto = {
  id: number;
  name: string;
};

/**
 * 멤버 레벨 enum
 */
export enum MemberLevel {
  NOVICE = 'NOVICE', // 입문자
  BEGINNER = 'BEGINNER', // 초급자
  INTERMEDIATE = 'INTERMEDIATE', // 중급자
  ADVANCED = 'ADVANCED', // 숙련자
}

/**
 * 멤버 개인화 설정 DTO
 */
export type MemberPersonalizationDto = {
  level: MemberLevel | null;
  background: string | null;
  interests: number[];
  keywords: string[];
};

/**
 * 연결된 계정 조회 응답 DTO
 */
export type MemberConnectedAccountsResponseDto = {
  googleConnected: boolean;
  kakaoConnected: boolean;
  githubConnected: boolean;
};

