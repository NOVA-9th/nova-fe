import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  memberId: number | null;
  hasHydrated: boolean;
  isFirstVisit: boolean;
  login: (token: string, memberId: number) => void;
  logout: () => void;
  setFirstVisit: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      memberId: null,
      hasHydrated: false,
      isFirstVisit: true,

      login: (token, memberId) => {
        set({
          isLoggedIn: true,
          accessToken: token,
          memberId,
          isFirstVisit: false,
        });
      },

      logout: () => {
        set({
          isLoggedIn: false,
          accessToken: null,
          memberId: null,
        });
      },

      setFirstVisit: (value) => {
        set({ isFirstVisit: value });
      },
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ hasHydrated: true });
      },
    },
  ),
);
