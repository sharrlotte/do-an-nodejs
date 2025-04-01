import api from '@/api/api';
import { Novel } from '@/schema/novel.schema';
import { useQuery } from '@tanstack/react-query';

export default function useNovels() {
  return useQuery({ queryKey: ['novel'], queryFn: () => api.get('/novels').then((result) => result.data as Novel[]) });
}
