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

function novelPopular() {
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
    <div className="relative w-full">
      {/* Background mờ */}
      <div className="absolute inset-0 overflow-hidden">
        <Image src={novels[0].imgurlNovel} alt="background" fill className="object-cover blur-md opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full max-w-7xl mx-auto p-2"
        >
          <div className="font-semibold text-2xl text-white p-2">Truyện Nổi Bật</div>
          <CarouselContent>
            {novels.map((novel, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <NovelPopularCard novel={novel} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </div>
  );
}

function NovelPopularCard({ novel }: { novel: Novel }) {
  return (
    <div className="p-1">
      <Card className="border-0 bg-transparent">
        <CardContent className="flex gap-4 p-0">
          {/* Ảnh bìa truyện */}
          <div className="relative w-[180px] h-[240px] flex-shrink-0">
            <Image src={novel.imgurlNovel} alt={novel.nameNovel} fill className="object-cover rounded-lg" />
          </div>

          {/* Thông tin truyện */}
          <div className="flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-white line-clamp-2 mb-2">{novel.nameNovel}</h3>
            <div className="text-gray-300 text-sm mb-2">Thể loại: {novel.catagoryNovel}</div>
            <p className="text-gray-200 text-sm line-clamp-4 mb-4">{novel.describeNovel}</p>
            <div className="mt-auto">
              <div className="flex items-center gap-1 text-yellow-400">
                {'★'.repeat(Math.floor(novel.rankingNovel))}
                {'☆'.repeat(5 - Math.floor(novel.rankingNovel))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default novelPopular;
