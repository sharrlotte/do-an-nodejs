import api from '@/api/api';
import { NovelDetail } from '@/schema/novel.schema';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { BookOpen, BookmarkPlus, Share2, Database, ChevronLeftIcon } from 'lucide-react';
import CommentSection from '@/components/common/comment-section';
import FollowButton from '@/app/(everyone)/novels/[id]/follow-button';
import { CategoryList } from '@/app/(everyone)/novels/[id]/chapters/category-list';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const novel = await api.get(`/novels/${id}`).then((result) => result.data as NovelDetail);
  const { chapters } = novel;

  return (
    <div className="min-h-screen h-full">
      {/* Novel Detail Section */}
      <NovelDetailPanel novel={novel} />

      {/* Tabs Section */}
      <div className="container mx-auto mt-4 p-4">
        <Tabs defaultValue="chapters" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-200">
            <TabsTrigger value="chapters" className="font-bold">
              Chương ({novel.chapterCount})
            </TabsTrigger>
            <TabsTrigger value="comments">Bình luận ({novel.commentCount})</TabsTrigger>
            <TabsTrigger value="art">Ảnh</TabsTrigger>
            <TabsTrigger value="related">Liên quan</TabsTrigger>
          </TabsList>

          <TabsContent value="chapters" className="mt-4">
            <ChapterList id={novel.id} chapters={chapters} />
          </TabsContent>

          <TabsContent value="comments" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <CommentSection novelId={novel.id} />
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
// Chapter List Component
const ChapterList = ({ id, chapters }: { id: number; chapters: NovelDetail['chapters'] }) => {
  return (
    <Card className="border-0 rounded-lg overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gray-900 text-white p-4 flex items-center">
          <Database className="mr-2 h-5 w-5" />
          <h2 className="text-xl font-bold">Danh sách chương</h2>
        </div>
        <div>
          {chapters.map((chapter, index) => (
            <Link className="flex justify-between items-center p-4 hover:bg-gray-100 border-b" href={`/novels/${id}/chapters/${chapter.id}`} key={index}>
              <span>{chapter.title}</span>
              <div className="text-gray-500">{new Date(chapter.createdAt).toLocaleDateString()}</div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Page Component
function NovelDetailPanel({ novel }: { novel: NovelDetail }) {
  return (
    <div className="relative flex flex-col md:flex-row gap-6 p-4 bg-black text-white overflow-scroll">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image src={novel.imageUrl || '/placeholder.svg'} alt="background" fill className="object-cover opacity-20" />
      </div>
      {/* Cover Image */}
      <div className="relative container mx-auto flex flex-col md:flex-row gap-6">
        <Link href={`/`} className="flex md:flex-row items-center px-2 py-1 text-white rounded-lg bg-white/40 backdrop-blur-sm sm:absolute right-1 top-1">
          <ChevronLeftIcon size={20} /> Quay về trang chủ
        </Link>
        <div className="flex-shrink-0 w-full md:w-64">
          <Image src={novel.imageUrl || '/placeholder.svg'} alt={novel.title} width={250} height={350} className="w-full h-auto rounded-md border-2 border-red-600" />
        </div>

        {/* Novel Info */}
        <div className="flex-grow space-y-4">
          <div>
            <h1 className="text-5xl font-bold text-white mb-1">{novel.title}</h1>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <FollowButton novelId={novel.id} />
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
          <CategoryList novel={novel} />

          {/* Publication Info */}
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
            <span>PUBLICATION: 2018, COMPLETED</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4 text-lg">
            <div className="flex items-center">
              <BookmarkPlus className="h-5 w-5" />
              <span className="ml-1">{novel.followCount}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-5 w-5" />
              <span className="ml-1">{novel.commentCount}</span>
            </div>
            <div className="text-gray-400">N/A</div>
          </div>

          {/* Description */}
          <p className="text-lg">{novel.description}</p>
          <Separator className="bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
