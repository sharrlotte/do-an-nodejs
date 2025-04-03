import api from '@/api/api';
import { Chapter } from '@/schema/chapter.schema';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Suspense } from 'react';
import { ChapterList } from '@/app/(everyone)/novels/[id]/chapters/[chapterId]/chapter-list';
import { ChevronLeftIcon, ChevronRightIcon, ListIcon, SettingsIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import PlayButton from '@/app/(everyone)/novels/[id]/chapters/[chapterId]/play-button';
import { VoiceProvider } from '@/context/VoiceContext';
import UserSheet from '@/app/UserSheet';
import CommentSection from '@/components/common/comment-section';

type Props = {
  params: Promise<{ id: number; chapterId: number }>;
};

const ChapterSetting = dynamic(() => import('@/app/(everyone)/novels/[id]/chapters/[chapterId]/chapter-setting'));

export default async function Page({ params }: Props) {
  const { id, chapterId } = await params;

  const chapter = await api.get(`/chapters/${chapterId}`).then((result) => result.data as Chapter);
  const { nextChapterId, previousChapterId, novel } = chapter;

  return (
    <VoiceProvider>
      <div className="bg-white">
        <div className="bg-accent text-accent-foreground w-full p-4 flex justify-between items-center">
          <Link className="text-2xl" href="/">
            NovelScan
          </Link>
          <UserSheet />
        </div>
        <div className="p-4 sticky top-0 backdrop-blur-sm bg-white/50 flex items-center gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/novels/${id}`}>{chapter.novel.title}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{chapter.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Dialog>
            <DialogTrigger className="ml-auto">
              <SettingsIcon size={20} fill="white" stroke="black" />
            </DialogTrigger>
            <DialogContent className="p-8">
              <Suspense>
                <ChapterSetting />
              </Suspense>
            </DialogContent>
          </Dialog>
          <PlayButton text={chapter.content} />
        </div>
        <div className="max-w-[1000px] mx-auto p-4">
          <div className="flex w-full justify-center items-center gap-2 mt-4 mb-4 text-white">
            {previousChapterId && (
              <Link className="px-2 py-1 flex items-center rounded-md bg-amber-600" href={`/novels/${novel.id}/chapters/${previousChapterId}`}>
                <ChevronLeftIcon size={20} /> Chapter trước
              </Link>
            )}
            <ChapterListDialog id={novel.id} />
            {nextChapterId && (
              <Link className="px-2 py-1 flex items-center rounded-md bg-amber-600" href={`/novels/${novel.id}/chapters/${nextChapterId}`}>
                Chapter kế <ChevronRightIcon size={20} />
              </Link>
            )}
          </div>
          <h1 className="text-3xl font-bold mb-4">{chapter.title}</h1>
          <main id="content">
            {chapter.content.map((p, index) => (
              <p key={index}>{p}</p>
            ))}
          </main>
          <div className="w-full mt-6"></div>
          <div className="flex w-full justify-between mt-10 underline mb-4">
            {previousChapterId && (
              <Link className="flex items-center" href={`/novels/${novel.id}/chapters/${previousChapterId}`}>
                <ChevronLeftIcon size={20} /> Chapter trước
              </Link>
            )}
            {nextChapterId && (
              <Link className="ml-auto flex items-center" href={`/novels/${novel.id}/chapters/${nextChapterId}`}>
                Chapter <ChevronRightIcon size={20} />
              </Link>
            )}
          </div>
          <CommentSection novelId={id} chapterId={chapterId} />
        </div>
      </div>
    </VoiceProvider>
  );
}

function ChapterListDialog({ id }: { id: number }) {
  return (
    <Dialog>
      <DialogTrigger className="px-3 flex py-1 rounded-md bg-amber-600 items-center gap-1">
        <ListIcon size={20} />
        Danh sách chương
      </DialogTrigger>
      <DialogContent>
        <Suspense>
          <ChapterList id={id} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
