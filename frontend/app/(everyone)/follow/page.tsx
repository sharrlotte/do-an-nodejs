'use client';

import api from '@/api/api';
import Header from '@/app/Header';
import Loading from '@/app/loading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSession } from '@/context/SessionContext';
import { getRelativeTime } from '@/lib/utils';
import { ChapterUpdate } from '@/schema/chapter.schema';
import { FollowingNovel } from '@/schema/novel.schema';
import { useQuery } from '@tanstack/react-query';
import { LogIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const { state } = useSession();

  if (state === 'unauthenticated') {
    return (
      <Link className="flex " href="/account/login">
        <LogIn />
        Dăng nhập
      </Link>
    );
  }

  return (
    <div className="space-y-2 h-full flex flex-col p-4">
      <Header />
      <Tabs defaultValue="follow" className="h-full overflow-hidden flex gap-2 flex-col items-start">
        <TabsList>
          <TabsTrigger value="follow">Theo dõi</TabsTrigger>
          <TabsTrigger value="update">Mới cập nhật </TabsTrigger>
        </TabsList>
        <div className="overflow-y-auto h-full bg-card rounded-lg w-full">
          <TabsContent value="follow">
            <Follow />
          </TabsContent>
          <TabsContent value="update">
            <Update />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function Follow() {
  const { state } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ['following'],
    queryFn: () => api.get('/users/@me/following').then((result) => result.data as FollowingNovel[]),
    enabled: state === 'authenticated',
  });

  return (
    <div className="space-y-2 p-2 bg-card h-full flex-col flex rounded-lg">
      <h1 className="text-lg font-semibold">Truyện đang theo dõi</h1>
      <section className="grid gap-2">
        {isLoading ? (
          <Loading></Loading>
        ) : (
          data?.map((following) => (
            <div key={following.id} className="flex rounded-lg bg-zinc-300 p-2 gap-4">
              <Image src={following.imageUrl} alt={following.title} width={120} height={160} className="object-cover" />
              <div>
                <Link className="flex text-xl flex-col flex-1" href={`/novels/${following.id}`}>
                  {following.title}
                </Link>
                <p className="text-muted-foreground line-clamp-3">{following.description}</p>
                {following.chapters.length > 0 && (
                  <Link className="flex-1" href={`/novels/${following.id}/chapters/${following.chapters[0]?.id}`}>
                    Chapter mới nhất: <span className="underline">{following.chapters[0]?.title}</span>
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

function Update() {
  const { state } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ['update'],
    queryFn: () => api.get('/users/@me/update').then((result) => result.data as ChapterUpdate[]),
    enabled: state === 'authenticated',
  });

  return (
    <div className="space-y-2 p-2 bg-card h-full flex-col flex rounded-lg">
      <h1 className="text-lg font-semibold">Truyện mới cập nhật</h1>
      <section className="grid gap-2">
        {isLoading ? (
          <Loading></Loading>
        ) : (
          data?.map((following) => {
            const read = following.index <= (following.novel.ReadHistory?.[0]?.chapter.index ?? -1);

            return (
              <div key={following.id} className={`flex gap-2 rounded-lg bg-zinc-300 ${read ? 'opacity-50 text-muted-foreground' : ''}`}>
                <Link href={`/novels/${following.novel.id}`} className={`flex p-2 gap-4 justify-between`}>
                  <Image src={following.novel.imageUrl} alt={following.title} width={30} height={40} className="object-cover" />
                  {following.novel.title}
                </Link>
                <Link href={`/novels/${following.novel.id}/chapters/${following.id}`} className={`flex w-full p-2 gap-4 justify-between ${read ? 'opacity-70 text-muted-foreground' : ''}`}>
                  <span>{following.title}</span>
                  <span>
                    {read ? 'Đã đọc' : ''} {getRelativeTime(new Date(following.createdAt))}
                  </span>
                </Link>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}
