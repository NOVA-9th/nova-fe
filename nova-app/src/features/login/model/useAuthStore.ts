import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  memberId: number | null;
  hasHydrated: boolean;
  login: (token: string, memberId: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      memberId: null,
      hasHydrated: false,

      login: (token, memberId) => {
        set({
          isLoggedIn: true,
          accessToken: token,
          memberId,
        });
      },

      logout: () => {
        set({
          isLoggedIn: false,
          accessToken: null,
          memberId: null,
        });
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
