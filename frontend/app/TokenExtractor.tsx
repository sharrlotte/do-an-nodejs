'use client';

import { useSession } from '@/context/SessionContext';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TokenExtractor() {
  const params = useSearchParams();
  const router = useRouter();

  const { refresh } = useSession();

  useEffect(() => {
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      const n = new URLSearchParams(params);
      n.delete('token');
      router.push(`?${n.toString()}`);
      setTimeout(() => refresh(), 1000);
    }
  }, [params, router, refresh]);

  return <></>;
}
