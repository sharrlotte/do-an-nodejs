import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { categoryApi, Category, CreateCategoryDto, UpdateCategoryDto } from '../api/category.api';
import { toast } from '../components/ui/use-toast';

export const useCategories = () => {
  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateCategoryDto) => categoryApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: 'Thành công',
        description: 'Đã thêm thể loại mới',
      });
    },
    onError: () => {
      toast({
        title: 'Thất bại',
        description: 'Không thể thêm thể loại',
        variant: 'destructive',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCategoryDto }) => categoryApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: 'Thành công',
        description: 'Đã cập nhật thể loại',
      });
    },
    onError: () => {
      toast({
        title: 'Thất bại',
        description: 'Không thể cập nhật thể loại',
        variant: 'destructive',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => categoryApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: 'Thành công',
        description: 'Đã xóa thể loại',
      });
    },
    onError: () => {
      toast({
        title: 'Thất bại',
        description: 'Không thể xóa thể loại',
        variant: 'destructive',
      });
    },
  });

  return {
    categories,
    isLoading,
    createCategory: createMutation.mutate,
    updateCategory: updateMutation.mutate,
    deleteCategory: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
