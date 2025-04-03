export type ReadHistory = {
  id: number;
  novelId: number;
  chapterId: number;
  userId: number;
  novel: {
    id: number;
    title: string;
    categories: string[];
    description: string;
    imageUrl: string;
    commentCount: number;
  };

  chapter: {
    id: string;
    title: string;
  };
};
