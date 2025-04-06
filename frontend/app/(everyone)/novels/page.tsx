'use client';

import Header from '@/app/Header';
import Loading from '@/app/loading';
import { NovelCard, NovelList } from '@/app/novel';
import useNovels from '@/hook/use-novels';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const params = useSearchParams();

  const orderBy = params.get('orderBy') ?? 'createdAt';
  const order = params.get('order') ?? 'desc';

  const { data, isLoading } = useNovels(orderBy as any, order as any);

  return (
    <div className="flex flex-col gap-2 p-4">
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-y-auto h-full">
          <section className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {data?.map((novel) => (
              <NovelCard key={novel.id} novel={novel} />
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
