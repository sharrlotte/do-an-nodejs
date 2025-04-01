'use client';

import Loading from '@/app/loading';
import { DialogClose } from '@/components/ui/dialog';
import { useNovel } from '@/hook/use-novel';
import Link from 'next/link';

export function ChapterList({ id }: { id: number }) {
  const { data: novel, isLoading, isError, error } = useNovel(id);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>{error?.message}</span>;
  }

  if (!novel) {
    return <></>;
  }

  const { chapters } = novel;

  return (
    <div className="m-6 md:max-h-[80dvh]">
      {chapters.map((chapter, index) => (
        <Link href={`/novels/${novel.id}/chapters/${chapter.id}`} key={index}>
          <DialogClose className="w-full text-ellipsis">
            <div className="flex justify-between items-center p-4 hover:bg-gray-100 border-b">
              <span>{chapter.title}</span>
              <div className="text-gray-500">{new Date(chapter.createdAt).toLocaleDateString()}</div>
            </div>
          </DialogClose>
        </Link>
      ))}
    </div>
  );
}
