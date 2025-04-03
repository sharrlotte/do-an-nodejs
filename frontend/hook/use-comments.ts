import api from '@/api/api';
import { Comment } from '@/schema/comment.schema';
import { useQuery } from '@tanstack/react-query';

export default function useComments(novelId: number, chapterId?: number) {
  return useQuery({
    queryKey: ['comments', novelId, chapterId],
    queryFn: () => api.get(`/comments`, { params: { novelId, chapterId } }).then((result) => result.data as Comment[]),
  });
}
