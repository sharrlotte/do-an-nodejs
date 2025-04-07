'use client';

import Header from '@/app/Header';
import Loading from '@/app/loading';
import ProtectedRoute from '@/components/layout/protected-route';
import { useSession } from '@/context/SessionContext';
import React, { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const { session, state } = useSession();

if (state === 'loading') {
  return <Loading />;
}

  return (
    <ProtectedRoute session={session} filter={{ role: 'USER' }}>
      <div className="divide-y-2 h-full flex flex-col overflow-hidden px-4">
        <Header />
        <div className="p-4 h-full overflow-hidden">{children}</div>
      </div>
    </ProtectedRoute>
  );
}
