'use client';

import { Batcher } from '@/lib/batcher';
import { useInterval } from 'usehooks-ts';

export default function BatcherComponent() {
  useInterval(async () => await Batcher.process(), 100);
  return <div></div>;
}
