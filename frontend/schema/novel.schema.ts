export type Novel = {
  id: number;
  title: string;
  categories: string[];
  description: string;
  imageUrl: string;
};

export type NovelDetail = {
  id: number;
  title: string;
  categories: string[];
  description: string;
  imageUrl: string;
  chapters: Chapter[];
  followCount: number;
};

type Chapter = {
  id: number;
  title: string;
  createdAt: Date;
};
