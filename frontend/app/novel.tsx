'use client';

import React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Novel } from '@/schema/novel.schema';
import useNovels from '@/hook/use-novels';
import Link from 'next/link';
import useFollow from '@/hook/use-follow';
import { cn } from '@/lib/utils';
import { BookmarkIcon } from 'lucide-react';
import Loading from '@/app/loading';

export function NovelList({ text, orderBy, order }: { text: string; orderBy?: 'chapterCount' | 'createdAt' | 'followCount'; order?: 'asc' | 'desc' }) {
  const { data: novels } = useNovels('', [], orderBy, order);

  if (!novels) return <></>;

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full mx-auto"
    >
      <div className="font-semibold text-blue-400 py-2">{text}</div>
      <CarouselContent>
        {novels?.map((novel, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 relative">
            <NovelCard novel={novel} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export function NovelCard({ novel }: { novel: Novel }) {
  const { isFollowing, isLoading, toggleFollow } = useFollow(novel.id);

  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the follow button
    e.stopPropagation(); // Prevent further propagation of the event
    toggleFollow();
  };

  return (
    <Card className="flex-row flex gap-2 items-start relative group h-full">
      <button onClick={handleFollowClick} disabled={isLoading} className={cn('absolute top-2 right-2 text-sm text-gray-700 backdrop-blur-sm hidden hover:flex group-hover:flex', { flex: isFollowing })}>
        {isLoading ? <Loading /> : isFollowing ? <BookmarkIcon fill="yellow" stroke="transparent" /> : <BookmarkIcon />}
      </button>
      <Link className="p-4" href={`/novels/${novel.id}`}>
        <div className="min-w-[120px] h-[160px] rounded-lg overflow-hidden">
          <Image src={novel.imageUrl} alt={novel.title} width={120} height={160} className="object-cover" />
        </div>
        <div className="flex-1">
          <CardTitle className="font-medium text-lg">{novel.title}</CardTitle>
          <CardContent className="flex flex-col p-0">
            <div className="text-xs text-muted-foreground line-clamp-3 text-ellipsis">{novel.description}</div>
            <div className="text-sm text-muted-foreground py-1 space-x-2">
              Thể loại:
              {novel.categories.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </CardContent>
        </div>
      </Link>
    </Card>
  );
}
