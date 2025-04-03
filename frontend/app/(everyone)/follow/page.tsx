'use client';

import api from '@/api/api';
import Header from '@/app/Header';
import Loading from '@/app/loading';
import { FollowingNovel } from '@/schema/novel.schema';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ['following'],
    queryFn: () => api.get('/users/@me/following').then((result) => result.data as FollowingNovel[]),
  });

  console.log(data);

  return (
    <div className="space-y-2 h-full flex flex-col p-4">
      <Header />
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
    </div>
  );
}
