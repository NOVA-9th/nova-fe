/**
 * 백엔드 ApiResponse 구조에 맞춘 공통 응답 타입
 */
export type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T | null;
};


/**
 * 공통 에러 코드
 */
export enum CommonErrorCode {
  BAD_REQUEST = 'COMMON400',
  FORBIDDEN = 'COMMON403',
  RESOURCE_NOT_FOUND = 'COMMON404',
  METHOD_NOT_ALLOWED = 'COMMON405',
  INTERNAL_SERVER_ERROR = 'COMMON500',
}

