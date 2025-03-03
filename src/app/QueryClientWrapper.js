"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a new QueryClient instance on the client side
const queryClient = new QueryClient();

export default function QueryClientWrapper({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}