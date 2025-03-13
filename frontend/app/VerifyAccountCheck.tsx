'use client';

import { useSession } from '@/context/SessionContext';
import { useRouter } from 'next/navigation';

export default function VerifyAccountChecker() {
  const { session } = useSession();
  const router = useRouter();

  if (session && session.isVerified === false) {
    router.push('/account/verify-email');
  }

  return undefined;
}
