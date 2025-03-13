'use client';

const checkFirstVisit = () => {
  if (typeof window !== 'undefined') {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
      return true;
    }
    return false;
  }
  return false;
};

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function FirstView() {
  const router = useRouter();

  useEffect(() => {
    if (checkFirstVisit()) {
      router.replace('/promopage');
    }
  }, [router]);

  return <></>;
}
