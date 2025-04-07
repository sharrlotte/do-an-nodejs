'use client';

import { revalidate } from '@/action/action';
import axiosInstance from '@/api/api';
import { toast } from '@/components/ui/use-toast';
import { useCategories } from '@/hook/use-category';
import { NovelDetail } from '@/schema/novel.schema';

export default function useDeleteCategory(novel: NovelDetail) {
  const { categories } = useCategories();

  const handleDeleteCategory = async (category: string) => {
    const categoryId = categories?.find((c) => c.name === category)?.id;

    try {
      await axiosInstance.delete(`/novels/${novel.id}/categories/${categoryId}`);
      novel.categories = novel.categories.filter((c) => c !== category);
      toast({ title: 'Thêm thể loại thành công' });
      revalidate('/novels/[id]');
    } catch (error) {
      toast({ title: 'Thêm thể loại thất bại', variant: 'destructive' });
    }
  };

  return { handleDeleteCategory };
}
