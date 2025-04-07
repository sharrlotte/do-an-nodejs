'use client';

import api from '@/api/api';
import Header from '@/app/Header';
import Loading from '@/app/loading';
import { Button } from '@/components/ui/button';
import useFollow from '@/hook/use-follow';
import { cn } from '@/lib/utils';
import { NovelDetail } from '@/schema/novel.schema';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { BookmarkIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col h-full w-full p-4 gap-2 overflow-hidden">
      <Header />
      <h1>Gacha truyện</h1>
      <GachaCard />
    </div>
  );
}

function GachaCard() {
  const { data, isLoading } = useQuery({
    queryKey: ['gacha'],
    queryFn: () => api.get('/novels/random').then((result) => result.data as [NovelDetail]),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (data) {
    return (
      <div className="flex flex-col bg-card p-2 rounded-lg h-full overflow-hidden">
        <NovelCard novel={data[0]} />
      </div>
    );
  }

  return <div></div>;
}

function NovelCard({ novel }: { novel: NovelDetail }) {
  const { isFollowing, isLoading, toggleFollow } = useFollow(novel.id);
  const queryClient = useQueryClient();

  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the follow button
    e.stopPropagation(); // Prevent further propagation of the event
    toggleFollow();
  };

  return (
    <div className="flex-col flex gap-2 items-start relative group h-full overflow-hidden">
      <Link href={`/novels/${novel.id}`}>
        <div className="min-[120px] h-[160px] rounded-lg overflow-hidden">
          <Image src={novel.imageUrl} alt={novel.title} width={120} height={160} className="object-cover" />
        </div>
        <div className="flex-1">
          <h2 className="font-medium">{novel.title}</h2>
          <div className="flex flex-col p-0">
            <div className="text-sm text-muted-foreground line-clamp-3 text-ellipsis">{novel.description}</div>
            <div className="text-sm text-muted-foreground py-1 space-x-1">
              Thể loại:
              {novel.categories.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
            <div className="text-muted-foreground">Số chương: {novel.chapterCount}</div>
          </div>
        </div>
      </Link>
      <div className="flex h-full overflow-y-auto flex-col w-full">
        <h3>Danh sách chương</h3>
        {novel.chapters.map((chapter, index) => (
          <Link className="flex justify-between items-center p-4 hover:bg-gray-100 border-b" href={`/novels/${novel.id}/chapters/${chapter.id}`} key={index}>
            <span>{chapter.title}</span>
            <div className="text-gray-500">{new Date(chapter.createdAt).toLocaleDateString()}</div>
          </Link>
        ))}
      </div>
      <div className="ml-auto gap-1 flex mt-auto">
        <Button variant="outline" onClick={handleFollowClick} disabled={isLoading} className={cn('text-sm text-gray-700 backdrop-blur-sm flex')}>
          {isLoading ? (
            <Loading />
          ) : isFollowing ? (
            <div className="flex items-center">
              <BookmarkIcon size={24} fill="yellow" stroke="transparent" />
              Đã lưu
            </div>
          ) : (
            <div className="flex items-center">
              <BookmarkIcon size={24} />
              Lưu
            </div>
          )}
        </Button>
        <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['gacha'] })}>Truyện khác</Button>
      </div>
    </div>
  );
}
