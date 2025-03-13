'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebookF, faGithub } from '@fortawesome/free-brands-svg-icons';
import env from '@/constant/env';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Link from 'next/link';
import { signin, signup } from '@/api/auth.api';
import { useRouter } from 'next/navigation';
import { useSession } from '@/context/SessionContext';
import { revalidate } from '@/action/action';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { RegisterRequest, registerSchema, LoginRequest, loginSchema } from '@/schema/auth.schema';
import { Input } from '@/components/ui/input';

export default function Page() {
  const [isActive, setIsActive] = useState(true);
  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-300 to-blue-200">
      <div id="container" className={`relative w-full max-w-4xl min-h-[520px] h-1/2 bg-white rounded-2xl shadow-lg overflow-hidden ${isActive ? 'active' : ''}`}>
        <div className={`sign-up absolute top-0 h-full w-1/2 p-10 overflow-auto transition-transform duration-600 ${isActive ? 'transform translate-x-2/2 opacity-100 z-50' : 'transform translate-x-0 opacity-0 z-0'}`}>
          <LoginPanel />
        </div>
        <div className={`sign-up absolute top-0 h-full w-1/2 p-10 overflow-auto transition-transform duration-600 ${isActive ? 'transform translate-x-0 opacity-0 z-10' : 'transform translate-x-full opacity-100 z-10'}`}>
          <RegisterPanel />
        </div>
        <div className={`overlay-container absolute top-0 h-full w-full flex`}>
          <div className={`overlay absolute top-0 left-0 h-full w-1/2 bg-purple-600 text-white p-10 flex items-center justify-center transition-transform duration-600 ${isActive ? '-translate-x-full' : 'translate-x-0'}`}>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-xl font-bold mb-3">Chào bạn !</h1>
              <p className="text-sm mb-5">Đăng ký để bắt đầu hàng trình của bạn</p>
              <button className="px-6 py-2 text-sm font-semibold bg-white text-purple-600 rounded uppercase" onClick={handleRegisterClick}>
                Đăng nhập
              </button>
            </div>
          </div>
          <div className={`overlay absolute top-0 right-0 h-full w-1/2 bg-purple-600 text-white p-10 flex items-center justify-center transition-transform duration-600 ${isActive ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-xl font-bold mb-3">Chào mừng trở lại!</h1>
              <p className="text-sm mb-5">Tiếp tục hành trình của bạn</p>
              <button className="px-6 py-2 text-sm font-semibold bg-white text-purple-600 rounded uppercase" onClick={handleLoginClick}>
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RegisterPanel() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (value: RegisterRequest) => signup(value),
    onSuccess: () => {
      setTimeout(() => queryClient.invalidateQueries(), 400);

      form.reset();
      router.push('/account/verify-email');
      toast({
        title: 'Đăng ký thành công',
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
    <div className="flex-col justify-center items-center overflow-hidden">
      {isPending && <LoadingOverlay />}
      <h1 className="font-bold text-xl mb-2 flex justify-center">Tạo tài khoản</h1>
      <div className="social-icons flex justify-center mb-2 space-x-2">
        <Link href="#" className="icon flex items-center justify-center w-10 h-10 p-2 border border-gray-300 rounded-full">
          <FontAwesomeIcon icon={faGooglePlusG} />
        </Link>
        <Link href="#" className="icon flex items-center justify-center w-10 h-10 p-2 border border-gray-300 rounded-full">
          <FontAwesomeIcon icon={faFacebookF} />
        </Link>
        <Link href={`${env.url.backend_url}/auth/github`} className="icon flex items-center justify-center w-10 h-10 p-2 border border-gray-300 rounded-full">
          <FontAwesomeIcon icon={faGithub} />
        </Link>
      </div>
      <span className="flex text-sm mb-2 justify-center">Hoặc sửa dụng tài khoản Email của bạn</span>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutate(data))} className="space-y-2 overflow-hidden">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex-col justify-center items-center">
                <div>
                  <FormLabel className="font-medium text-lg">Tên tài khoản</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên người dùng" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-col justify-center items-center">
                <div>
                  <FormLabel className="font-medium text-lg">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
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
                  <FormLabel className="font-medium text-lg whitespace-nowrap">Mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Mật khẩu" {...field} />
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
                  <FormLabel className="font-medium text-lg whitespace-nowrap">Xác nhận mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Nhập lại mật khẩu" {...field} />
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
      </Form>
    </div>
  );
}

function LoginPanel() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  const { refresh } = useSession();
  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (value: LoginRequest) => signin(value),
    onSuccess: () => {
      router.push('/');
      form.reset();
      setTimeout(() => queryClient.invalidateQueries(), 400);

      setTimeout(() => {
        refresh();
        revalidate('/');
      }, 400);
    },
    onError: (error: any) => {
      switch (error.response.status) {
        case 409:
          toast({
            title: 'Lỗi',
            description: 'Tên tài khoản đã tồn tại, vui lòng chọn tên khác',
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
    <>
      {isPending && <LoadingOverlay />}
      <h1 className="font-bold text-xl mb-2 flex justify-center mt-8">Đăng nhập tài khoản</h1>
      <div className="social-icons flex justify-center mb-2 space-x-2">
        <Link href="#" className="icon flex items-center justify-center w-10 h-10 p-2 border border-gray-300 rounded-full">
          <FontAwesomeIcon icon={faGooglePlusG} />
        </Link>
        <Link href="#" className="icon flex items-center justify-center w-10 h-10 p-2 border border-gray-300 rounded-full">
          <FontAwesomeIcon icon={faFacebookF} />
        </Link>
        <Link href={`${env.url.backend_url}/auth/github`} className="icon flex items-center justify-center w-10 h-10 p-2 border border-gray-300 rounded-full">
          <FontAwesomeIcon icon={faGithub} />
        </Link>
      </div>
      <span className="flex text-sm mb-2 justify-center">Hãy đăng nhập tài khoản của bạn</span>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutate(data))} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="font-medium text-lg">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Mật khẩu" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center">
            <Button type="submit" className="mt-4 px-6 py-2 text-sm font-semibold text-white bg-purple-600 rounded uppercase">
              đăng nhập
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
