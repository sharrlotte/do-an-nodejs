import { getSession } from '@/api/auth-server.api';
import Header from '@/app/Header';
import ProtectedRoute from '@/components/layout/protected-route';
import React, { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession();

  return (
    <ProtectedRoute session={session} filter={{ role: 'USER' }}>
      <div className="divide-y-2 h-full flex flex-col overflow-hidden px-4">
        <Header />
        <div className="p-4 h-full overflow-hidden">{children}</div>
      </div>
    </ProtectedRoute>
  );
}
