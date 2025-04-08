'use client';

import { useSession } from '@/context/SessionContext';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export default function TokenExtractor() {
  const [token] = useLocalStorage('token', '', {
    deserializer: (value) => value,
  });

  const params = useSearchParams();

  const router = useRouter();

  const { refresh } = useSession();

  useEffect(() => {
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      refresh();
      const n = new URLSearchParams(params);
      n.delete('token');
      router.push(`?${n.toString()}`);
    }
  }, [params, refresh, router]);

  useEffect(() => {
    refresh();
  }, [refresh, token]);

  return <></>;
}
