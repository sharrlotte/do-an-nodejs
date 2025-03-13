import Header from '@/app/Header';
import React, { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full flex flex-col">
      <Header className="p-4" />
      {children}
    </div>
  );
}
