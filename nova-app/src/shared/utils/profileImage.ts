/**
 * API에서 받은 프로필 이미지 경로를 브라우저에서 로드 가능한 전체 URL로 변환합니다.
 * env의 NEXT_PUBLIC_API_BASE_URL을 앞에 붙여서 사용합니다.
 * @param version 이미지 변경 시 캐시 무효화를 위한 값 (예: dataUpdatedAt). 넣으면 URL에 ?v= 가 붙어 브라우저/Next 캐시를 피합니다.
 */
export function getProfileImageUrl(
  path: string | null | undefined,
  version?: number | string,
): string {
  if (!path) return '/basicImage.jpg';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return version != null ? `${path}?v=${version}` : path;
  }
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return path;
  const baseTrimmed = base.replace(/\/$/, '');
  const pathWithSlash = path.startsWith('/') ? path : `/${path}`;
  const url = `${baseTrimmed}${pathWithSlash}`;
  return version != null ? `${url}?v=${version}` : url;
}
