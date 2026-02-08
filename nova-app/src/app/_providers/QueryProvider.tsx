'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  // 렌더마다 QueryClient가 새로 만들어지는 것 방지
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
