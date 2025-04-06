'use client';

import Loading from '@/app/loading';
import useSearchNovels from '@/hook/use-search-novel';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const [q] = useDebounceValue(query, 500);

  const { data, isLoading } = useSearchNovels(q);

  return (
    <div className="relative w-full">
      <input
        className="w-full h-10 p-2 ps-10 text-sm rounded-lg overflow-hidden text-gray-900 border-2 border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Bạn đang tìm kiếm những gì ?"
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
      />
      {q && (
        <div className="absolute w-full bg-card border p-2 mt-2 rounded-md max-h-[60vh] overflow-y-auto">
          {isLoading && <Loading />}
          {data?.map((novel, index) => (
            <Link key={novel.id} className={`p-4 flex gap-1 items-center ${index % 2 === 0 ? 'bg-card' : 'bg-card/80'}`} href={`/novels/${novel.id}`}>
              <div className="w-[30px] h-[40px] rounded-lg overflow-hidden">
                <Image src={novel.imageUrl} alt={novel.title} width={120} height={160} className="object-cover" />
              </div>
              <div className="flex-1">{novel.title}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
