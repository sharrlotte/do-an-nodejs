import { Expose } from 'class-transformer';

export class UserResponse {
  @Expose()
  id: number;

  @Expose()
  avatar: string | null;

  @Expose()
  username: string;
}

export class UserProfileResponse {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  about: string;

  @Expose()
  avatar: string | null;
}
