import api from '@/api/api';
import { ChangePasswordRequest, LoginRequest, RegisterRequest, VerifyEmailRequest } from '@/schema/auth.schema';
import { Session } from '@/schema/user.schema';

export async function signin(request: LoginRequest): Promise<Session> {
  return api.post('/account/signin', request, {
    data: request,
  });
}

export async function signup(request: RegisterRequest) {
  return api.post('/account/signup', request, {
    data: request,
  });
}

export async function changePassword(request: ChangePasswordRequest) {
  return api.post('/account/change-password', request, {
    data: request,
  });
}
export async function verifyEmail(request: VerifyEmailRequest) {
  return api.post('/account/verify', request, {
    data: request,
  });
}
