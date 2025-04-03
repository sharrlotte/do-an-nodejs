import { Novel } from '@/schema/novel.schema';

export type Chapter = {
  id: number;
  title: string;
  content: string[];
  nextChapterId: number | undefined;
  previousChapterId: number | undefined;
  createdAt: Date;
  novel: Novel;
  commentCount: number;
};
