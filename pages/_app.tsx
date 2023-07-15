import type { AppProps } from 'next/app';
import 'twin.macro';

import { ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from '@tanstack/react-query';

import queryClient from '@/commons/config/react-query.config';

import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Toaster containerStyle={{ zIndex: 10000 }} position="top-center" reverseOrder={false} />
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
