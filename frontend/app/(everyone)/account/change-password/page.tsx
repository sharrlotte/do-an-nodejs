'use client';

import { changePassword } from '@/api/auth.api';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ChangePasswordRequest, changePasswordSchema } from '@/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function Page() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<ChangePasswordRequest>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (value: ChangePasswordRequest) => changePassword(value),
    onSuccess: () => {
      setTimeout(() => queryClient.invalidateQueries(), 400);
      form.reset();
      router.push('/');
      toast({
        title: 'Đổi mật khẩu thành công',
      });
    },
    onError: (error: any) => {
      switch (error.response.status) {
        case 400:
          toast({
            title: 'Lỗi',
            description: error.response.data,
            variant: 'destructive',
          });
          break;

        case 409:
          toast({
            title: 'Lỗi',
            description: 'Tên tài khoản hoặc email đã tồn tại, vui lòng chọn tên khác',
            variant: 'destructive',
          });
          break;

        default:
          toast({
            title: 'Lỗi',
            description: 'Có lỗi đã xảy ra, vui lòng thử lại sau',
            variant: 'destructive',
          });
          break;
      }
    },
  });
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-300 to-blue-200">
      {isPending && <LoadingOverlay />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutate(data))} className="w-1/3 space-y-2 relative max-w-4xl min-h-[520px] bg-white rounded-2xl shadow-lg overflow-hidden p-10">
          <h2>Thay đổi mật khẩu</h2>
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem className="flex-col justify-center items-center">
                <div>
                  <FormLabel className="font-medium text-lg">Mật khảu cũ</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex-col justify-center items-center">
                <div>
                  <FormLabel className="font-medium text-lg">Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="flex-col justify-center items-center">
                <div>
                  <FormLabel className="font-medium text-lg whitespace-nowrap">Nhập lại mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center">
            <Button type="submit" className="mt-4 px-6 py-2 text-sm font-semibold text-white bg-purple-600 rounded uppercase">
              Đăng ký
            </Button>
          </div>
        </form>
      </Form>{' '}
    </div>
  );
}
