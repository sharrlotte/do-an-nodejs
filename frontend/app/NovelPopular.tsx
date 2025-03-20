'use client';
import { CardContent } from '@/components/ui/card';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';

interface Novel {
  nameNovel: string;
  catagoryNovel: string;
  describeNovel: string;
  imgurlNovel: string;
  rankingNovel: number;
}

function NovelPopular() {
  const novels = [
    {
      nameNovel: "Munou no Akudou Ouji wa Ikinokoritai ~Ren'ai RPG no Akuyaku Mob ni Tensei Shita kedo, Gensaku Mushi...",
      catagoryNovel: 'Action, Fantasy, Isekai, Romance',
      describeNovel:
        "\"Prepare yourself, Protagonist. With this power, I will change this predetermined future.\" One day, he was suddenly reincarnated into the world of his favorite romance RPG. However, the body he had reincarnated into belonged to the 'Incompetent Evil Prince' Harold who had his engagement broken off with the heroine. On top of that, according to the setting, he wasn't able to use his magic power and would be defeated by the protagonist. But, it'll be different this time. First, he stopped his engagement from being broken off with the heroine and started training himself. Then, he obtained a power different from the one he had in the original work, and overwhelmed everyone with the enormous magic power he shouldn't have been able to use! And before he realized it, his single-minded pursuit of strength had also gotten the attention of the other heroines...",
      imgurlNovel: '/image/wallpage.png',
      rankingNovel: 4.5,
    },
    {
      nameNovel: "Munou no Akudou Ouji wa Ikinokoritai ~Ren'ai RPG no Akuyaku Mob ni Tensei Shita kedo, Gensaku Mushi...",
      catagoryNovel: 'Action, Fantasy, Isekai, Romance',
      describeNovel:
        "\"Prepare yourself, Protagonist. With this power, I will change this predetermined future.\" One day, he was suddenly reincarnated into the world of his favorite romance RPG. However, the body he had reincarnated into belonged to the 'Incompetent Evil Prince' Harold who had his engagement broken off with the heroine. On top of that, according to the setting, he wasn't able to use his magic power and would be defeated by the protagonist. But, it'll be different this time. First, he stopped his engagement from being broken off with the heroine and started training himself. Then, he obtained a power different from the one he had in the original work, and overwhelmed everyone with the enormous magic power he shouldn't have been able to use! And before he realized it, his single-minded pursuit of strength had also gotten the attention of the other heroines...",
      imgurlNovel: '/image/wallpage.png',
      rankingNovel: 4.5,
    },
    {
      nameNovel: "Munou no Akudou Ouji wa Ikinokoritai ~Ren'ai RPG no Akuyaku Mob ni Tensei Shita kedo, Gensaku Mushi...",
      catagoryNovel: 'Action, Fantasy, Isekai, Romance',
      describeNovel:
        "\"Prepare yourself, Protagonist. With this power, I will change this predetermined future.\" One day, he was suddenly reincarnated into the world of his favorite romance RPG. However, the body he had reincarnated into belonged to the 'Incompetent Evil Prince' Harold who had his engagement broken off with the heroine. On top of that, according to the setting, he wasn't able to use his magic power and would be defeated by the protagonist. But, it'll be different this time. First, he stopped his engagement from being broken off with the heroine and started training himself. Then, he obtained a power different from the one he had in the original work, and overwhelmed everyone with the enormous magic power he shouldn't have been able to use! And before he realized it, his single-minded pursuit of strength had also gotten the attention of the other heroines...",
      imgurlNovel: '/image/wallpage.png',
      rankingNovel: 4.5,
    },
    {
      nameNovel: "Munou no Akudou Ouji wa Ikinokoritai ~Ren'ai RPG no Akuyaku Mob ni Tensei Shita kedo, Gensaku Mushi...",
      catagoryNovel: 'Action, Fantasy, Isekai, Romance',
      describeNovel:
        "\"Prepare yourself, Protagonist. With this power, I will change this predetermined future.\" One day, he was suddenly reincarnated into the world of his favorite romance RPG. However, the body he had reincarnated into belonged to the 'Incompetent Evil Prince' Harold who had his engagement broken off with the heroine. On top of that, according to the setting, he wasn't able to use his magic power and would be defeated by the protagonist. But, it'll be different this time. First, he stopped his engagement from being broken off with the heroine and started training himself. Then, he obtained a power different from the one he had in the original work, and overwhelmed everyone with the enormous magic power he shouldn't have been able to use! And before he realized it, his single-minded pursuit of strength had also gotten the attention of the other heroines...",
      imgurlNovel: '/image/wallpage.png',
      rankingNovel: 4.5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % novels.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [novels.length]);

  return (
    <div className="relative w-full bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <NextImage src={novels[currentIndex]?.imgurlNovel || '/placeholder.svg'} alt="background" fill className="object-cover opacity-20" />
      </div>
      <div className="relative z-10 py-8 px-4 max-w-7xl mx-auto">
        <h2 className="font-bold text-4xl text-white mb-6">Popular New Titles</h2>

        <Carousel className="w-full">
          <CarouselContent style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: 'transform 0.5s ease-in-out' }}>
            {novels.map((novel, index) => (
              <CarouselItem key={index} className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-[300px] h-[400px] flex-shrink-0">
                  <NextImage src={novel.imgurlNovel || '/placeholder.svg'} alt={novel.nameNovel} fill className="object-cover rounded-lg" />
                </div>
                <div className="flex-1">
                  <a href="/novel-detail" className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {novel.nameNovel}
                  </a>
                  <div className="flex gap-4 mb-6">
                    {novel.catagoryNovel.split(', ').map((category, idx) => (
                      <span key={idx} className="uppercase text-xs font-semibold tracking-wider text-gray-300">
                        {category}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-300 text-base mb-6 leading-relaxed">{novel.describeNovel}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-gray-400">Minamo Mire, Sammibon</div>
                    <div className="text-white font-bold">NO. {index + 1}</div>
                  </div>
                </div>
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
            <NextImage src={novel.imgurlNovel || '/placeholder.svg'} alt={novel.nameNovel} fill className="object-cover rounded-lg" />
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

export default NovelPopular;
