'use server';

import api from '@/api/api';
import { Session } from '@/schema/user.schema';
import { cookies } from 'next/headers';

export async function getSession(): Promise<Session | null> {
  const result = await api.get('/users/session', { headers: { Cookie: cookies().toString() } });

  return Object.keys(result.data).length === 0 ? null : result.data;
}

export async function getAuthSession(): Promise<Session> {
  const session = await getSession();

  if (!session) {
    throw new Error('Session not found');
  }

  return session;
}
