import api from '@/api/api';
import { UpdateProfileRequest, UserProfile } from '@/schema/user.schema';
import { cookies } from 'next/headers';

export async function getProfile(id: number): Promise<UserProfile> {
  const result = await api.get(`/users/${id}/profile`, { headers: { Cookie: cookies().toString() } });

  return result.data;
}

export async function updateProfile(id: number, payload: UpdateProfileRequest) {
  const result = await api.patch(`/users/${id}/profile`, payload, { headers: { Cookie: cookies().toString() } });

  return result.data;
}
