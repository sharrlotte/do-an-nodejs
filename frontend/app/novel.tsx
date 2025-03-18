'use client';

import React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

type Novel = {
  nameNovel: string;
  catagoryNovel: string;
  describeNovel: string;
  imgurlNovel: string;
  rankingNovel: number;
};
function novel() {
  const novels = [
    {
      nameNovel: 'Tiểu thuyết A',
      catagoryNovel: 'Hành động',
      describeNovel: 'Một câu chuyện hấp dẫn...',
      imgurlNovel: '/image/wallpage.png',
      rankingNovel: 4.5,
    },
    {
      nameNovel: 'Tiểu thuyết B',
      catagoryNovel: 'Phiêu lưu',
      describeNovel: 'Một chuyến hành trình kỳ diệu...',
      imgurlNovel: '/image/wallpage.png',
      rankingNovel: 4.8,
    },
    {
      nameNovel: 'Tiểu thuyết C',
      catagoryNovel: 'Phiêu lưu',
      describeNovel: 'Một chuyến hành trình kỳ diệu...',
      imgurlNovel: '/image/wallpage.png',
      rankingNovel: 4.8,
    },
    {
      nameNovel: 'Tiểu thuyết D',
      catagoryNovel: 'Phiêu lưu',
      describeNovel: 'Một chuyến hành trình kỳ diệu...',
      imgurlNovel: '/image/wallpage.png',
      rankingNovel: 4.8,
    },
    {
      nameNovel: 'Tiểu thuyết E',
      catagoryNovel: 'Phiêu lưu',
      describeNovel: 'Một chuyến hành trình kỳ diệu...',
      imgurlNovel: '/image/wallpage.png',
      rankingNovel: 4.8,
    },
    {
      nameNovel: 'Tiểu thuyết F',
      catagoryNovel: 'Phiêu lưu',
      describeNovel: 'Một chuyến hành trình kỳ diệu...',
      imgurlNovel: '/image/wallpage.png',
      rankingNovel: 4.8,
    },
  ];

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full max-w-7xl mx-auto p-2"
    >
      <div className="font-semibold text-blue-400 p-2">Mới cập nhật</div>
      <CarouselContent>
        {novels.map((novel, index) => (
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
    <div className="p-1">
      <Card>
        <CardContent className="flex flex-col p-0">
          <div className="relative group w-full h-[300px]">
            <Image src={novel.imgurlNovel} alt={novel.nameNovel} fill className="object-cover rounded-t-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg p-4">
              <div className="text-white text-lg font-bold">{novel.describeNovel}</div>
              <div className="text-gray-300 text-sm">Thể loại: {novel.catagoryNovel}</div>
              <div className="text-yellow-400 font-semibold">⭐ {novel.rankingNovel}/5</div>
            </div>
          </div>
          <div className="p-4">
            <div className="font-medium text-center">{novel.nameNovel}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default novel;
