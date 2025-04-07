'use client';
import { Badge } from '@/components/ui/badge';
import { CardContent } from '@/components/ui/card';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import useNovels from '@/hook/use-novels';
import { Novel } from '@/schema/novel.schema';
import NextImage from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function NovelPopular() {
  const { data } = useNovels();

  const novels = data ?? [];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % novels.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [novels.length]);

  return (
    <div className="relative w-full bg-black rounded-lg overflow-none">
      <div className="absolute inset-0 overflow-hidden">
        <NextImage src={novels[currentIndex]?.imageUrl || '/placeholder.svg'} alt="background" fill className="object-cover opacity-20" />
      </div>
      <div className="relative z-10 py-8 px-4 max-w-7xl mx-auto">
        <h2 className="font-bold text-4xl text-white mb-6">Truyên mới nổi</h2>
        <Carousel className="w-full h-[400px] overflow-hidden">
          <CarouselContent style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: 'transform 0.5s ease-in-out' }}>
            {novels.map((novel, index) => (
              <CarouselItem key={index}>
                <Link className="flex flex-col md:flex-row gap-6" href={`/novels/${novel.id}`}>
                  <div className="relative w-full md:w-[300px] h-[400px] flex-shrink-0">
                    <NextImage src={novel.imageUrl || '/placeholder.svg'} alt={novel.title} fill className="object-cover rounded-lg" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{novel.title}</h3>
                    <div className="flex gap-4 mb-6">
                      {novel.categories?.map((category, idx) => (
                        <span key={idx} className="uppercase text-xs font-semibold tracking-wider text-gray-300">
                          {category}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-300 text-base mb-6 leading-relaxed">{novel.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-gray-400">Minamo Mire, Sammibon</div>
                      <div className="text-white font-bold mt-auto">NO. {index + 1}</div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2" onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + novels.length) % novels.length)} />
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2" onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % novels.length)} />
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
            <NextImage src={novel.imageUrl || '/placeholder.svg'} alt={novel.title} fill className="object-cover rounded-lg" />
          </div>

          {/* Thông tin truyện */}
          <div className="flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-white line-clamp-2 mb-2">{novel.title}</h3>
            <div className="text-sm text-muted-foreground">
              Thể loại:
              {novel.categories.map((c) => (
                <Badge key={c}>{c}</Badge>
              ))}
            </div>
            <p className="text-gray-200 text-sm line-clamp-4 mb-4">{novel.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default NovelPopular;
