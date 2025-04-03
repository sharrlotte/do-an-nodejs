export type Novel = {
  id: number;
  title: string;
  categories: string[];
  description: string;
  imageUrl: string;
  commentCount: number;
};

export type NovelDetail = {
  id: number;
  title: string;
  categories: string[];
  description: string;
  imageUrl: string;
  chapters: Chapter[];
  followCount: number;
  commentCount: number;
};

type Chapter = {
  id: number;
  title: string;
  createdAt: Date;
};
