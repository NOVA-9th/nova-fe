import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosAdapter } from 'axios';
import { ApiResponse } from '@/shared/types/api';

// API Base URL - 환경 변수 필수 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

// 커스텀 fetch adapter 구현 (GET, POST, PUT, PATCH, DELETE 모두 지원)
const fetchAdapter: AxiosAdapter = async (config: InternalAxiosRequestConfig) => {
  const { url, method = 'GET', data, headers, timeout, signal, params } = config;

  // URL 구성
  let fullUrl = url?.startsWith('http') ? url : `${config.baseURL}${url}`;

  // Query 파라미터 추가
  if (params) {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((v) => searchParams.append(key, String(v)));
        } else {
          searchParams.append(key, String(value));
        }
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      fullUrl += (fullUrl.includes('?') ? '&' : '?') + queryString;
    }
  }

  // AbortController로 timeout 처리
  const controller = new AbortController();
  let timeoutId: NodeJS.Timeout | null = null;

  if (timeout) {
    timeoutId = setTimeout(() => controller.abort(), timeout);
  }

  // Request 옵션 구성
  const requestOptions: RequestInit = {
    method: method.toUpperCase(),
    headers: {
      ...headers,
    } as HeadersInit,
    signal: (signal as AbortSignal | undefined) || controller.signal,
  };

  // Body 추가 (GET, HEAD, DELETE는 body 없이, 나머지는 body 포함)
  const hasBody =
    data !== undefined &&
    data !== null &&
    method !== 'GET' &&
    method !== 'HEAD' &&
    method !== 'DELETE';

  if (hasBody) {
    // FormData인 경우 Content-Type을 설정하지 않음 (브라우저가 자동 설정)
    if (data instanceof FormData) {
      requestOptions.body = data;
      // FormData일 때는 Content-Type 헤더를 제거 (브라우저가 boundary 자동 추가)
      if (requestOptions.headers) {
        const headersObj = requestOptions.headers as Record<string, string>;
        delete headersObj['Content-Type'];
      }
    } else if (typeof data === 'string') {
      requestOptions.body = data;
    } else {
      requestOptions.body = JSON.stringify(data);
    }
  }

  try {
    const response = await fetch(fullUrl, requestOptions);

    if (timeoutId) clearTimeout(timeoutId);

    // Response 데이터 파싱
    const contentType = response.headers.get('content-type');
    let responseData: any;

    // Content-Type이 없거나 빈 응답인 경우
    if (!contentType || response.status === 204) {
      responseData = null;
    } else if (contentType.includes('application/json')) {
      const text = await response.text();
      responseData = text ? JSON.parse(text) : null;
    } else {
      responseData = await response.text();
    }

    // Axios 응답 형식으로 변환
    const axiosResponse = {
      data: responseData,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as any,
      config: config as any,
      request: response,
    };

    // HTTP 에러 상태 코드 처리 (axios는 2xx가 아니면 에러로 처리)
    if (response.status >= 200 && response.status < 300) {
      return axiosResponse;
    } else {
      // Axios 에러 형식으로 변환
      const error = new axios.AxiosError(
        `Request failed with status code ${response.status}`,
        axios.AxiosError.ERR_BAD_RESPONSE,
        config as any,
        response as any,
        axiosResponse,
      );
      throw error;
    }
  } catch (error) {
    if (timeoutId) clearTimeout(timeoutId);

    // AbortError (timeout) 처리
    if (error instanceof Error && error.name === 'AbortError') {
      const timeoutError = new axios.AxiosError(
        timeout ? `timeout of ${timeout}ms exceeded` : 'Request aborted',
        axios.AxiosError.ETIMEDOUT,
        config as any,
      );
      throw timeoutError;
    }

    // 이미 AxiosError인 경우 그대로 throw
    if (axios.isAxiosError(error)) {
      throw error;
    }

    // 기타 에러
    throw new axios.AxiosError(
      error instanceof Error ? error.message : 'Network Error',
      axios.AxiosError.ERR_NETWORK,
      config as any,
    );
  }
};

// AxiosInstance 생성
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  adapter: fetchAdapter, // 커스텀 fetch adapter 사용
});

// Request Interceptor - 토큰 자동 추가
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      // zustand persist 형식으로 저장된 토큰 읽기
      // zustand persist는 'auth-storage' 키에 JSON으로 저장
      let token: string | null = null;

      try {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
          const parsed = JSON.parse(authStorage);
          token = parsed?.state?.accessToken || null;
        }
      } catch (error) {
        console.warn('[Axios] Failed to parse auth-storage from localStorage', error);
      }

      // 토큰이 있으면 헤더에 추가
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response Interceptor - 에러 처리
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<ApiResponse<null>>) => {
    // 401 Unauthorized - 토큰 만료 또는 인증 실패
    if (error.response?.status === 401) {
      // 토큰 제거 및 로그인 페이지로 리다이렉트
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        // 필요시 로그인 페이지로 리다이렉트
        // window.location.href = '/login';
      }
    }

    // 403 Forbidden
    if (error.response?.status === 403) {
      // 권한 없음 처리
      console.error('접근 권한이 없습니다.');
    }

    // 500 Internal Server Error
    if (error.response?.status === 500) {
      console.error('서버 내부 오류가 발생했습니다.');
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
