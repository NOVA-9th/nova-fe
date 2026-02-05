import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  memberId: number | null;
  login: (token: string, memberId: number) => void;
  logout: () => void;
}

const getInitialAuthState = () => {
  if (typeof window === 'undefined') {
    return {
      isLoggedIn: false,
      accessToken: null,
      memberId: null,
    };
  }

  const token = localStorage.getItem('accessToken');
  const memberId = localStorage.getItem('memberId');

  return {
    isLoggedIn: !!token,
    accessToken: token,
    memberId: memberId ? Number(memberId) : null,
  };
};

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialAuthState(),

  login: (token, memberId) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('memberId', String(memberId));

    set({
      isLoggedIn: true,
      accessToken: token,
      memberId,
    });
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('memberId');

    set({
      isLoggedIn: false,
      accessToken: null,
      memberId: null,
    });
  },
}));
