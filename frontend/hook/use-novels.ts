import api from '@/api/api';
import { Novel } from '@/schema/novel.schema';
import { useQuery } from '@tanstack/react-query';

export default function useNovels(orderBy?: 'createdAt' | 'followCount', order: 'asc' | 'desc' = 'desc') {
  return useQuery({ queryKey: ['novel', orderBy, order], queryFn: () => api.get('/novels', { params: { orderBy, order } }).then((result) => result.data as Novel[]) });
}
