import api from '@/api/api';
import { NovelDetail } from '@/schema/novel.schema';
import { useQuery } from '@tanstack/react-query';

export function useNovel(id: number) {
  return useQuery({ queryKey: ['novel', id], queryFn: () => api.get(`/novels/${id}`).then((result) => result.data as NovelDetail) });
}
