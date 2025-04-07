'use client';

import { useCategories } from '@/hook/use-category';
import { MenubarItem } from '@/components/ui/menubar';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export function CategoryList() {
  const { categories, isLoading } = useCategories();

  return isLoading ? (
    <MenubarItem className="px-3 py-1">
      <Loader2 className="h-4 w-4 animate-spin" />
    </MenubarItem>
  ) : (
    categories?.map((category) => (
      <MenubarItem key={category.id} className="px-3 py-1">
        <Link href={`/search?category=${category.name}`}>{category.name}</Link>
      </MenubarItem>
    ))
  );
}
