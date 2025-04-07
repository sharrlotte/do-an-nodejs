'use client';

import AddCategoryButton from '@/app/(everyone)/novels/[id]/add-category-button';
import ProtectedElement from '@/components/layout/protected-element';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { useSession } from '@/context/SessionContext';
import useDeleteCategory from '@/hook/use-delete-category';
import { NovelDetail } from '@/schema/novel.schema';
import { XIcon } from 'lucide-react';

export function CategoryList({ novel }: { novel: NovelDetail }) {
  const { session } = useSession();
  const { handleDeleteCategory } = useDeleteCategory(novel);

  return (
    <div className="flex flex-wrap gap-2">
      {novel.categories?.map((category, index) => (
        <Badge key={index} variant="outline" className="text-white group border-gray-600">
          {category}
          <ProtectedElement session={session} filter={{ role: 'ADMIN' }}>
            <AlertDialog>
              <AlertDialogTrigger>
                <XIcon className="ml-2 size-4 text-destructive cursor-pointer group-hover:flex hidden" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Xóa Danh Mục</AlertDialogTitle>
                  <AlertDialogDescription>Bạn có chắc chắn muốn xóa danh mục {category} khỏi truyện này?</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDeleteCategory(category)}>Xóa</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ProtectedElement>
        </Badge>
      ))}
      <AddCategoryButton novel={novel} />
    </div>
  );
}
