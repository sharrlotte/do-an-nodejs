'use client';

import { useSession } from '@/context/SessionContext';

export default function LogoutButton({ children }: { children?: React.ReactNode }) {
  const { refresh } = useSession();
  return (
    <button
      className="text-nowrap flex gap-1"
      onClick={() => {
        window.localStorage.removeItem('token');
        refresh();
      }}
    >
      {children ?? 'Đăng xuất'}
    </button>
  );
}
