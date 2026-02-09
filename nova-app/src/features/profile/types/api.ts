import { MemberLevel } from '@/shared/types/memberLevel';

// 멤버 요청 정보 DTO
export type MemberRequestDto = {
  name: string;
};

// 멤버 정보 응답 DTO
export type MemberResponseDto = {
  id: number;
  name: string;
  email: string;
  profileImage: string | null;
};

// 멤버 정보 수정 응답 DTO
export type MemberUpdateResponseDto = {
  id: number;
  name: string;
};

// 멤버 개인화 설정 DTO
export type MemberPersonalizationDto = {
  level: MemberLevel | null;
  background: string | null;
  interests: number[];
  keywords: string[];
};

// 연결된 계정 조회 응답 DTO
export type MemberConnectedAccountsResponseDto = {
  googleConnected: boolean;
  kakaoConnected: boolean;
  githubConnected: boolean;
};
