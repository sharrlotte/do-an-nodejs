import { useSession } from '@/context/SessionContext';
import api from '@/api/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function useFollow(novelId: number) {
  const queryClient = useQueryClient();
  const queryKey = ['novel-follow', novelId];
  const { state } = useSession();

  const { data: isFollowing = false } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await api.get(`/novels/${novelId}/follow`);
      return response.data;
    },
    retry: 0,
    enabled: state === 'authenticated',
  });

  const { mutate: toggleFollow, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      if (isFollowing) {
        await api.delete(`/novels/${novelId}/follow`);
      } else {
        await api.post(`/novels/${novelId}/follow`);
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousValue = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, !isFollowing);
      return { previousValue };
    },
    onError: (error, _, context) => {
      console.error('Error toggling follow:', error);
      queryClient.setQueryData(queryKey, context?.previousValue);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return { isFollowing, isLoading, toggleFollow };
}
