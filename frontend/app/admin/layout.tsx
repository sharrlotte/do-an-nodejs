'use client';
import NavLink from '@/app/admin/NavLink';
import ProtectedRoute from '@/components/layout/protected-route';
import { Separator } from '@/components/ui/separator';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import React, { ReactNode } from 'react';
import Link from 'next/link';
import UserSheet from '../UserSheet';
import { Input } from '@/components/ui/input';
import LogoutButton from '@/components/common/LogoutButton';
import { useSession } from '@/context/SessionContext';
import Loading from '@/app/loading';
import { LogOutIcon, PenIcon } from 'lucide-react';

type LinkType = {
  links: { name: string; icon?: ReactNode; href: { name: string; href: string }[] | string }[];
  groupName: string;
  alt: string;
};

const links: LinkType[] = [
  {
    links: [
      { name: 'Trang chủ', icon: <Squares2X2Icon className="w-6 h-6" />, href: '/admin' },
      { name: 'Thể loại', icon: <PenIcon className="w-6 h-6" />, href: '/admin/category' },
    ],
    alt: 'home',
    groupName: '',
  },
];

export default function Page({ children }: { children: ReactNode }) {
  const { session, state } = useSession();

  if (state === 'loading') {
    return <Loading />;
  }

  return (
    <ProtectedRoute session={session} filter={{ any: [{ role: 'ADMIN' }, { authority: 'MANAGE_USER' }] }}>
      <div className="flex divide-x h-dvh overflow-hidden bg-[#f8f5f0]">
        <div className="text-nowrap min-w-64 h-full justify-between flex flex-col space-y-20 p-4 rounded-xl shadow-xl bg-white border-r border-[#e3d9c8]">
          <div>
            <Link className="p-4 text-3xl font-serif italic text-[#8b4513]" href="/">
              NovelScan
            </Link>
            {links.map(({ links, alt, groupName }, index) => (
              <div className="w-full flex justify-start gap-4 py-2 flex-col text-gray-500" key={index}>
                <div className="font-serif text-xl text-[#8b4513]" title={alt}>
                  {groupName}
                </div>
                <div className="p-2 flex flex-col gap-2 font-bold text-lg">
                  {links.map(({ icon, name, href }) => (
                    <NavLink key={name} icon={icon} href={href} name={name} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 pb-4 items-start justify-start">
            <Separator className="my-4 bg-[#e3d9c8]"></Separator>
            <Link href="/" className="flex items-center justify-start">
              <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" strokeWidth="1.5" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              Cài đặt
            </Link>
            <LogoutButton>
              <LogOutIcon className="size-5" /> Đăng xuất
            </LogoutButton>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full p-6 h-full overflow-hidden bg-[#f8f5f0]">
          <div className="py-2 gap-2 flex rounded-lg">
            <Input className="block w-full h-10 p-2 ps-10 text-sm text-[#5c4033] border border-[#e3d9c8] rounded-lg bg-white focus:ring-[#8b4513] focus:border-[#8b4513] placeholder-[#a89888]" placeholder="Bạn đang tìm kiếm những gì ?" required />
            <UserSheet />
          </div>
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}
