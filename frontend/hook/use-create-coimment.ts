import api from '@/api/api';
import { useToast } from '@/components/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCreateComment(novelId: number, chapterId?: number) {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  return useMutation({
    mutationFn: (content: string) => api.post(`/comments`, { content, novelId, chapterId }, { data: { content, novelId, chapterId } }).then((result) => result.data as Comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', novelId, chapterId], exact: true });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error?.message,
      });
    },
  });
}
