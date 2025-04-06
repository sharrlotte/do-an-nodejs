'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TokenExtractor() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      const n = new URLSearchParams(params);
      n.delete('token');
      router.push(`?${n.toString()}`);
    }
  }, [params, router]);

  return <></>;
}
