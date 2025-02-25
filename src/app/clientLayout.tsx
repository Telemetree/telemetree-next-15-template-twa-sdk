'use client';

import type { JSX } from 'react';
import React from 'react';

import { QueryProvider } from '@/providers/query';
import Providers from '@/app/providers';
// init();
const ClientLayout: ({ children }: { children: any }) => JSX.Element = ({
  children,
}) => {
  console.log(window.location.href);
  return (
    <section className="flex-1">
      <Providers>
        <QueryProvider>{children}</QueryProvider>
      </Providers>
    </section>
  );
};

export default ClientLayout;
