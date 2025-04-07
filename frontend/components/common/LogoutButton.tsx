'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      className="text-nowrap flex gap-1"
      onClick={() => {
        window.localStorage.removeItem('token');
        router.refresh();
      }}
    >
      Đăng xuất
    </button>
  );
}
