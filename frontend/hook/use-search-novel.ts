import api from '@/api/api';
import { Novel } from '@/schema/novel.schema';
import { useQuery } from '@tanstack/react-query';

export default function useSearchNovels(q: string) {
  return useQuery({ queryKey: ['search-novel', q], queryFn: () => api.get('/novels/search', { params: { q } }).then((result) => result.data as Novel[]) });
}
