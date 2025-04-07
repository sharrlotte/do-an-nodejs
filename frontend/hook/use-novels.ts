import api from '@/api/api';
import { Novel } from '@/schema/novel.schema';
import { useQuery } from '@tanstack/react-query';

export default function useNovels(q?: string, category?: string[], orderBy?: 'chapterCount' | 'createdAt' | 'followCount', order: 'asc' | 'desc' = 'desc') {
  return useQuery({ queryKey: ['novel', q, category, orderBy, order], queryFn: () => api.get('/novels', { params: { q, category, orderBy, order } }).then((result) => result.data as Novel[]) });
}
