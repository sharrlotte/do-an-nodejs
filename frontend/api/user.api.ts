import api from '@/api/api';
import { UserRole } from '@/constant/enum';
import { GetUsersRequest, User } from '@/schema/user.schema';

export async function getUsers(request: GetUsersRequest): Promise<User[]> {
  const result = await api.get('/users', { params: request });
  return result.data;
}
export async function updateUser(id: number, request: UserRole[]) {
  const data = { roles: request };
  const result = await api.put(`/users/${id}`, data, {
    data,
  });
  return result.data;
}
