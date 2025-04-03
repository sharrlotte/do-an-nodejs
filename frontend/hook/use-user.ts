import api from '@/api/api';
import { User } from '@/schema/user.schema';
import { useQuery } from '@tanstack/react-query';

export default function useUser(id: number) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => api.get(`/users/${id}`).then((res) => res.data as User),
  });
}
