'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

type Props = {
  readonly children: React.ReactNode;
};

const TanStackProvider = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: { color: '#6c717b' },
          success: {
            iconTheme: { primary: '#829b91', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#f04438', secondary: '#fff' },
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default TanStackProvider;
