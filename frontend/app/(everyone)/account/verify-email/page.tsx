'use client';

import React from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@headlessui/react';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { verifyEmail } from '@/api/auth.api';
import { useToast } from '@/components/ui/use-toast';
import { VerifyEmailRequest, verifyEmailSchema } from '@/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import { useRouter } from 'next/navigation';
import { revalidate } from '@/action/action';
import { useSession } from '@/context/SessionContext';

export default function LoginRegister() {
  const otpSlots = Array.from({ length: 6 }, (_, index) => index);
  const { refresh } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<VerifyEmailRequest>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      otp: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (value: VerifyEmailRequest) => verifyEmail(value),
    onSuccess: () => {
      setTimeout(() => queryClient.invalidateQueries(), 400);

      form.reset();
      router.push('/');
      setTimeout(() => {
        refresh();
        revalidate('/');
      }, 400);
      toast({
        title: 'Xác nhận thành công',
      });
    },
    onError: (error: any) => {
      switch (error.response.status) {
        case 400:
          toast({
            title: 'Lỗi',
            description: error.response.message,
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
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-300 to-blue-200 fixed inset-0">
      {isPending && <LoadingOverlay />}
      <div id="container" className={`relative w-full max-w-3xl min-h-[500px] bg-white rounded-2xl shadow-lg overflow-hidden`}>
        <div className="flex justify-center items-center mt-24">
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutate(data))} className="space-y-2 overflow-hidden">
              <h1 className="font-bold text-4xl mb-5">Xác nhận tài khoản </h1>
              <span className="text-1xl mb-4"> Nhập mã xác minh mà chúng tôi đã gửi cho bạn.</span>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex-col justify-center items-center p-1">
                    <span className="font-bold text-1xl flex mt-3">Mã xác nhận</span>
                    <div className="flex flex-col gap-5">
                      <InputOTP {...field} maxLength={6}>
                        <InputOTPGroup className="flex gap-2">
                          {otpSlots.map((index) => (
                            <InputOTPSlot className="h-20 w-20 text-5xl border" key={index} index={index} />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-row">
                <div className="flex flex-row gap-5">
                  <Button className="mt-20 px-6 py-2 text-sm font-semibold text-blue-600 rounded uppercase list-none">Gửi lại mã</Button>
                  <Button type="submit" className="mt-20 px-6 py-2 text-sm font-semibold text-blue-600 rounded uppercase hover:bg-blue-600 hover:text-white">
                    Xác nhận
                  </Button>
                </div>
                <div className="mt-24"></div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
