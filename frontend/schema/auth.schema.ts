import { z } from 'zod';

const passwordStrength = (password: string) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);

  return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
};

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(4, {
        message: 'Tên tài khoản phải nhiều hơn 4 kí tự',
      })
      .max(100, { message: 'Tên tài khoản phải ít hơn 100 kí tự' }),
    email: z
      .string()
      .min(4, {
        message: 'Email phải nhiều hơn 4 kí tự',
      })
      .max(100, { message: 'Email phải ít hơn 100 kí tự' })
      .refine((email) => email.endsWith('@gmail.com'), {
        message: 'Email không hợp lệ. Email phải có đuôi @gmail.com',
      }),

    password: z
      .string()
      .min(8, {
        message: 'Mật khẩu phải nhiều hơn 8 kí tự',
      })
      .max(100, { message: 'Mật khẩu phải ít hơn 100 kí tự' })
      .refine(passwordStrength, {
        message: 'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt',
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: 'Mật khẩu phải nhiều hơn 8 kí tự',
      })
      .max(100, { message: 'Mật khẩu phải ít hơn 100 kí tự' })
      .refine(passwordStrength, {
        message: 'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu và xác nhận mật khẩu phải trùng khớp',
    path: ['confirmPassword'],
  });

export type RegisterRequest = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(4, {
      message: 'Email phải nhiều hơn 4 kí tự',
    })
    .max(100, { message: 'Email phải ít hơn 100 kí tự' })
    .refine((email) => email.endsWith('@gmail.com'), {
      message: 'Email không hợp lệ. Email phải có đuôi @gmail.com',
    }),

  password: z
    .string()
    .min(8, {
      message: 'Mật khẩu phải nhiều hơn 8 kí tự',
    })
    .max(100, { message: 'Mật khẩu phải ít hơn 100 kí tự' })
    .refine(passwordStrength, {
      message: 'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt',
    }),
});

export type LoginRequest = z.infer<typeof loginSchema>;

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, {
        message: 'Mật khẩu phải nhiều hơn 8 kí tự',
      })
      .max(100, { message: 'Mật khẩu phải ít hơn 100 kí tự' })
      .refine(passwordStrength, {
        message: 'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt',
      }),
    password: z
      .string()
      .min(8, {
        message: 'Mật khẩu phải nhiều hơn 8 kí tự',
      })
      .max(100, { message: 'Mật khẩu phải ít hơn 100 kí tự' })
      .refine(passwordStrength, {
        message: 'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt',
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: 'Mật khẩu phải nhiều hơn 8 kí tự',
      })
      .max(100, { message: 'Mật khẩu phải ít hơn 100 kí tự' })
      .refine(passwordStrength, {
        message: 'Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu và xác nhận mật khẩu phải trùng khớp',
    path: ['confirmPassword'],
  })
  .refine((data) => data.oldPassword !== data.password, {
    message: 'Mật khẩu cũ và mật khẩu mới không được trùng khớp',
    path: ['confirmPassword'],
  });

export type ChangePasswordRequest = z.infer<typeof changePasswordSchema>;

export const verifyEmailSchema = z.object({
  otp: z
    .string()
    .min(6, {
      message: 'OTP phải có 6 kí tự',
    })
    .max(6, { message: 'OTP phải có 6 kí tự' })
    .refine((otp) => /[0-9]{6}/g.test(otp), {
      message: 'Otp phải là các ký tự số',
    }),
});

export type VerifyEmailRequest = z.infer<typeof verifyEmailSchema>;
