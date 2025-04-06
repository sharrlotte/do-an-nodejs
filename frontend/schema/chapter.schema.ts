import { Novel } from '@/schema/novel.schema';
import { ReadHistory } from '@/schema/read-historty.schema';

export type Chapter = {
  id: number;
  title: string;
  novelId: number;
  content: string[];
  nextChapterId: number | undefined;
  previousChapterId: number | undefined;
  createdAt: Date;
  novel: Novel;
  commentCount: number;
};

export type ChapterUpdate = {
  id: number;
  index: number;
  title: string;
  novelId: number;
  content: string[];
  nextChapterId: number | undefined;
  previousChapterId: number | undefined;
  createdAt: Date;
  commentCount: number;
  novel: {
    id: number;
    title: string;
    imageUrl: string;
    ReadHistory?: ReadHistory &
      {
        chapter: {
          index: number;
        };
      }[];
  };
};
