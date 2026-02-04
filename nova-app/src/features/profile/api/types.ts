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

