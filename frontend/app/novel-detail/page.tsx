'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Star, BookmarkPlus, Share2, Database } from 'lucide-react';

// Novel type definition as provided
type Novel = {
  nameNovel: string;
  catagoryNovel: string;
  describeNovel: string;
  imgurlNovel: string;
  rankingNovel: number;
};

// Chapter type definition
type Chapter = {
  number: number | string;
  date: string;
  url: string;
};

// Sample novel data based on the image
const sampleNovel: Novel = {
  nameNovel: 'EDENS ZERO',
  catagoryNovel: 'SCI-FI, TIME TRAVEL, ACTION, COMEDY, MECHA, MARTIAL ARTS, SAMURAI, ADVENTURE, MILITARY, DRAMA, FANTASY',
  describeNovel: 'Shiki is a human who lives in a city filled with only robots. He considers the robots to be his best friends, and always takes care of them. Then, one day, he comes across another human - Rebecca, a girl who makes videos online to become popular. And at the same time, the robots start to go crazy?',
  imgurlNovel: '/image/wallpage.png',
  rankingNovel: 7.59,
};

// Sample chapters data based on the second image
const sampleChapters: Chapter[] = [
  { number: 152, date: '18/03/2025', url: '#' },
  { number: 151, date: '18/03/2025', url: '#' },
  { number: 150, date: '08/03/2025', url: '#' },
  { number: 149, date: '05/03/2025', url: '#' },
  { number: 148, date: '04/03/2025', url: '#' },
  { number: 147, date: '03/03/2025', url: '#' },
  { number: 146, date: '03/03/2025', url: '#' },
  { number: 145, date: '27/02/2025', url: '#' },
  { number: '144.5', date: '26/02/2025', url: '#' },
  { number: 144, date: '23/02/2025', url: '#' },
  { number: 143, date: '22/02/2025', url: '#' },
  { number: 142, date: '20/02/2025', url: '#' },
  { number: 141, date: '19/02/2025', url: '#' },
  { number: 140, date: '19/02/2025', url: '#' },
  { number: '139.5', date: '19/02/2025', url: '#' },
  { number: 139, date: '19/02/2025', url: '#' },
];

// Novel Detail Component
const NovelDetail = ({ novel }: { novel: Novel }) => {
  const categories = novel.catagoryNovel.split(', ');

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 bg-black text-white relative overflow-y-auto">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image src={novel.imgurlNovel || '/placeholder.svg'} alt="background" fill className="object-cover opacity-20" />
      </div>
      {/* Cover Image */}
      <div className="flex-shrink-0 w-full md:w-64">
        <Image src={novel.imgurlNovel || '/placeholder.svg'} alt={novel.nameNovel} width={250} height={350} className="w-full h-auto rounded-md border-2 border-red-600" />
      </div>

      {/* Novel Info */}
      <div className="flex-grow space-y-4">
        <div>
          <h1 className="text-5xl font-bold text-white mb-1">{novel.nameNovel}</h1>
          <h2 className="text-xl text-gray-300">エデンズ ゼロ</h2>
          <p className="text-xl mt-2">Mashima Hiro</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <BookmarkPlus className="mr-2 h-4 w-4" />
            Add To Library
          </Button>
          <Button variant="outline" className="border-gray-600">
            <BookOpen className="h-5 w-5" />
          </Button>
          <Button variant="outline" className="border-gray-600">
            <Database className="h-5 w-5" />
          </Button>
          <Button variant="outline" className="border-gray-600">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-amber-600 hover:bg-amber-700">SUGGESTIVE</Badge>
          {categories.map((category, index) => (
            <Badge key={index} variant="outline" className="text-white border-gray-600">
              {category}
            </Badge>
          ))}
          <Badge variant="outline" className="text-white border-gray-600">
            MORE
          </Badge>
        </div>

        {/* Publication Info */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
          <span>PUBLICATION: 2018, COMPLETED</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-4 text-lg">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
            <span className="ml-1">{novel.rankingNovel}</span>
          </div>
          <div className="flex items-center">
            <BookmarkPlus className="h-5 w-5" />
            <span className="ml-1">23k</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="h-5 w-5" />
            <span className="ml-1">161</span>
          </div>
          <div className="text-gray-400">N/A</div>
        </div>

        {/* Description */}
        <p className="text-lg">{novel.describeNovel}</p>

        <p className="text-lg">
          A new manga from Hiro Mashima, of <span className="text-red-500">Rave Master</span> and <span className="text-red-500">Fairy Tail</span> fame.
        </p>

        <Separator className="bg-gray-700" />

        {/* Links */}
        <div>
          <h3 className="text-xl font-bold mb-2">Links:</h3>
          <ul className="list-disc list-inside">
            <li>
              <Link href="#" className="text-red-500 hover:underline">
                Alternate Official English
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Chapter List Component
const ChapterList = ({ chapters }: { chapters: Chapter[] }) => {
  return (
    <Card className="border-0 rounded-none">
      <CardContent className="p-0">
        <div className="bg-gray-900 text-white p-4 flex items-center">
          <Database className="mr-2 h-5 w-5" />
          <h2 className="text-xl font-bold">Danh sách chương</h2>
        </div>
        <div className="max-h-[600px] overflow-y-auto">
          {chapters.map((chapter, index) => (
            <Link href={chapter.url} key={index}>
              <div className="flex justify-between items-center p-4 hover:bg-gray-100 border-b">
                <div className="text-lg font-medium">Chương {chapter.number}</div>
                <div className="text-gray-500">{chapter.date}</div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Page Component
export default function NovelPage() {
  const [activeTab, setActiveTab] = useState('chapters');

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden overflow-y-auto">
      {/* Novel Detail Section */}
      <NovelDetail novel={sampleNovel} />

      {/* Tabs Section */}
      <div className="max-w-7xl mx-auto mt-4 p-4 overflow-y-auto">
        <Tabs defaultValue="chapters" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-200">
            <TabsTrigger value="chapters" className="font-bold">
              Chapters
            </TabsTrigger>
            <TabsTrigger value="comments">Comments (161)</TabsTrigger>
            <TabsTrigger value="art">Art</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
          </TabsList>

          <TabsContent value="chapters" className="mt-4">
            <ChapterList chapters={sampleChapters} />
          </TabsContent>

          <TabsContent value="comments" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <p>Comments section would go here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="art" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <p>Art gallery would go here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="related" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <p>Related novels would go here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
