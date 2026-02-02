/**
 * 멤버 정보 요청 DTO
 */
export interface MemberRequestDto {
  name: string;
}

/**
 * 멤버 정보 응답 DTO
 */
export interface MemberResponseDto {
  id: number;
  name: string;
  email: string;
  profileImage: string | null;
}

/**
 * 멤버 정보 수정 응답 DTO
 */
export interface MemberUpdateResponseDto {
  id: number;
  name: string;
}

