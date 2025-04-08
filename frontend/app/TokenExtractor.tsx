'use client';

import { useSession } from '@/context/SessionContext';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export default function TokenExtractor() {
  const [token, setToken] = useLocalStorage('token', '', {
    deserializer: (value) => value,
  });

  const params = useSearchParams();

  const router = useRouter();

  const { refresh } = useSession();

  useEffect(() => {
    const token = params.get('token');

    if (token) {
      setToken(token);
      refresh();
      const n = new URLSearchParams(params);
      n.delete('token');
      router.push(`?${n.toString()}`);
    }
  }, [params, router, setToken]);

  useEffect(() => {
    if (token) {
      refresh();
    }
  }, [refresh, token]);

  return <></>;
}
