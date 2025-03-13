import { getSession } from '@/api/auth-server.api';
import ProtectedElement from '@/components/layout/protected-element';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { HistoryIcon, HomeIcon, PackageCheckIcon, UserCircle } from 'lucide-react';
import React, { ReactNode } from 'react';
import Link from 'next/link';

import { ArrowLeftEndOnRectangleIcon, BookOpenIcon, Cog6ToothIcon, HeartIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import env from '@/constant/env';
import { Filter } from '@/lib/utils';

type Tab = {
  icon: ReactNode;
  action: ReactNode;
  filter?: Filter;
}[][];

const tabs: Tab = [
  [
    {
      icon: <HomeIcon className="w-5 h-5" />,
      action: (
        <Link className="w-full" href="/">
          Trang chủ
        </Link>
      ),
    },
  ],
  [
    {
      icon: <UserIcon className="w-5 h-5" />,
      action: (
        <Link className="w-full" href="/profile">
          Thông tin tài khoản
        </Link>
      ),
    },
    {
      icon: <ShoppingCartIcon className="w-5 h-5" />,
      action: (
        <Link className="w-full" href="/my-order">
          Đơn của bạn
        </Link>
      ),
    },
    {
      icon: <PackageCheckIcon className="w-5 h-5" />,
      action: (
        <Link className="w-full" href="/customer-order">
          Đơn của khách hàng
        </Link>
      ),
    },
  ],
  [
    {
      icon: <BookOpenIcon className="w-5 h-5" />,
      action: (
        <Link className="w-full" href="/my-post">
          Bài đăng của bạn
        </Link>
      ),
    },
    {
      icon: <HeartIcon className="w-5 h-5" />,
      action: (
        <Link className="w-full" href="/favorite-post">
          Bài đăng yêu thích
        </Link>
      ),
    },
    {
      icon: <HistoryIcon className="w-5 h-5" />,
      action: (
        <Link className="w-full" href="/post-browsing-history">
          Lịch sử truy cập
        </Link>
      ),
    },
  ],
  [
    {
      icon: <UserCircle className="w-5 h-5" />,
      action: (
        <Link className="w-full" href="/admin">
          Quản trị
        </Link>
      ),
      filter: { any: [{ role: 'ADMIN' }, { authority: 'MANAGE_USER' }] },
    },
    {
      icon: <Cog6ToothIcon className="w-5 h-5" />,
      action: 'Cài đặt',
    },
  ],
  [
    {
      icon: <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />,
      action: (
        <Link className="w-full" href={`${env.url.backend_url}/auth/logout`}>
          Đăng xuất
        </Link>
      ),
    },
  ],
];

export default async function UserSheet() {
  const user = await getSession();

  if (!user) {
    return (
      <Link className="p-2 text-nowrap" href="/account/login">
        Đăng nhập
      </Link>
    );
  }
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer" asChild>
        <Avatar className="h-9">
          <AvatarImage className="rounded-full h-9 w-9" src={user.avatar + '.png'} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent className="space-y-2 p-2 h-full flex flex-col">
        <div className="flex gap-2 items-end">
          <Avatar>
            <AvatarImage className="rounded-full h-10 w-10" src={user.avatar + '.png'} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{user.username}</span>
        </div>
        <div className="pt-6">
          <div>
            {tabs.map((tab, index) => (
              <React.Fragment key={index}>
                {tab.map(({ action, icon, filter }, index) => (
                  <ProtectedElement key={index} session={user} filter={filter}>
                    <div className="flex gap-2 hover:bg-blue-500 hover:text-white p-2 rounded-md">
                      {icon}
                      {action}
                    </div>
                  </ProtectedElement>
                ))}
                <div className="border-b pt-1 mb-1 w-full" />
              </React.Fragment>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
