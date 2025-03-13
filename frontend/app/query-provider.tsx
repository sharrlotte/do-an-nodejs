'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HTMLAttributes, useState } from 'react';

export default function QueryProvider({ children }: HTMLAttributes<HTMLDivElement>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 3,
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
