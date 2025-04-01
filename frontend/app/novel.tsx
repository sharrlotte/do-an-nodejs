'use client';

import React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Novel } from '@/schema/novel.schema';
import useNovels from '@/hook/use-novels';
import Link from 'next/link';

function NewNovel() {
  const { data: novels } = useNovels();

  if (!novels) return <></>;

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full mx-auto"
    >
      <div className="font-semibold text-blue-400 p-2">Mới cập nhật</div>
      <CarouselContent>
        {novels?.map((novel, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <NovelCard novel={novel} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function NovelCard({ novel }: { novel: Novel }) {
  return (
    <Link href={`/novels/${novel.id}`}>
      <Card className="flex-row flex gap-2 items-start p-1">
        <div className="min-w-[120px] h-[160px] rounded-lg overflow-hidden">
          <Image src={novel.imageUrl} alt={novel.title} width={120} height={160} className="object-cover" />
        </div>
        <div>
          <CardTitle className="font-medium text-lg">{novel.title}</CardTitle>
          <CardContent className="flex flex-col p-0">
            <div className="text-xs text-muted-foreground line-clamp-3 text-ellipsis">{novel.description}</div>
            <div className="text-sm text-muted-foreground">Thể loại: {novel.categories}</div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}

export default NewNovel;
