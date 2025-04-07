'use client';

export default function LogoutButton() {
  return (
    <button
      className="p-2 text-nowrap"
      onClick={() => {
        window.localStorage.removeItem('token');
      }}
    >
      Đăng xuất
    </button>
  );
}
