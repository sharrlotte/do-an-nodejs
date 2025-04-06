'use client';

import api from '@/api/api';
import Header from '@/app/Header';
import Loading from '@/app/loading';
import { useSession } from '@/context/SessionContext';
import { ReadHistory } from '@/schema/read-historty.schema';
import { useQuery } from '@tanstack/react-query';
import { LogIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const { state } = useSession();

  const { data, isLoading } = useQuery({
    queryKey: ['read-history'],
    queryFn: () => api.get('/users/@me/history').then((result) => result.data as ReadHistory[]),
    enabled: state === 'authenticated',
  });

  if (state === 'unauthenticated') {
    return (
      <Link className="flex" href="/account/login">
        <LogIn />
        Dăng nhập
      </Link>
    );
  }

  return (
    <div className="space-y-2 h-full flex flex-col p-4">
      <Header />
      <div className="space-y-2 p-2 bg-card h-full flex-col flex rounded-lg">
        <h1 className="text-lg font-semibold">Lịch sử đọc truyện</h1>
        <section className="grid gap-2">
          {isLoading ? (
            <Loading></Loading>
          ) : (
            data?.map((history) => (
              <div key={history.id} className="flex rounded-lg bg-zinc-300 p-2 gap-4">
                <Image src={history.novel.imageUrl} alt={history.novel.title} width={120} height={160} className="object-cover" />
                <div>
                  <Link className="flex text-xl flex-col flex-1" href={`/novels/${history.novel.id}`}>
                    {history.novel.title}
                  </Link>
                  <p className="text-muted-foreground line-clamp-3">{history.novel.description}</p>
                  <Link className="flex-1" href={`/novels/${history.novel.id}/chapters/${history.chapter.id}`}>
                    Đọc tới: <span className="underline">{history.chapter.title}</span>
                  </Link>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
