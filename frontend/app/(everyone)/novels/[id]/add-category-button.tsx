'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '@/api/category.api';
import axiosInstance from '@/api/api';
import { toast } from '@/components/ui/use-toast';
import { useSession } from '@/context/SessionContext';
import ProtectedElement from '@/components/layout/protected-element';
import { NovelDetail } from '@/schema/novel.schema';
import { revalidate } from '@/action/action';

type Props = {
  novel: NovelDetail;
};

export default function AddCategoryButton({ novel }: Props) {
  const novelId = novel.id;
  const [open, setOpen] = useState(false);
  const { session } = useSession();

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getAll(),
  });

  const handleAddCategory = async (categoryId: number) => {
    try {
      await axiosInstance.post(`/novels/${novelId}/categories`, { categoryId });
      toast({ title: 'Thêm thể loại thành công' });
      setOpen(false);
      novel.categories.push(categories.find((category) => category.id === categoryId)?.name || '');
      revalidate(`/novels/[id]`);
    } catch (error) {
      toast({ title: 'Thêm thể loại thất bại', variant: 'destructive' });
    }
  };

  return (
    <ProtectedElement session={session} filter={{ role: 'ADMIN' }}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <PlusIcon className="size-5" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm thể loại</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categories
              .filter((c) => !novel.categories.includes(c.name))
              .map((category) => (
                <Button key={category.id} variant="outline" className="justify-start" disabled={novel.categories.includes(category.name)} onClick={() => handleAddCategory(category.id)}>
                  {category.name}
                </Button>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </ProtectedElement>
  );
}
