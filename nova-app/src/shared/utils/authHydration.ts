'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/features/login/model/useAuthStore';

export const AuthHydration = () => {
  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  return null;
};
