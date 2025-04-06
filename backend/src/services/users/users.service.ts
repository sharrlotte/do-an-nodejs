import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthProvider } from 'src/types/auth';

import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import NotFound from 'src/error/NotFound';
import { UserProfileResponse } from 'src/services/users/dto/user.response';
import { UpdateProfileDto } from 'src/services/users/dto/update-profile.dto';
import { SessionDto } from 'src/services/auth/dto/session.dto';

type UserWithAuthoritiesAndRoles = Prisma.UserGetPayload<{}> & { roles: string[]; authorities: string[] };

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async find(providerId: string, provider: AuthProvider): Promise<UserWithAuthoritiesAndRoles | null> {
    let user = await this.prismaService.account
      .findFirst({
        where: {
          provider,
          providerId,
        },
      })
      .user({
        include: {
          authorities: {
            select: {
              authority: {
                select: {
                  name: true,
                },
              },
            },
          },
          roles: {
            select: {
              role: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

    if (!user) {
      return null;
    }

    const roles = user.roles.map((item) => item.role.name);
    const authorities = user.authorities.map((item) => item.authority.name);

    return { ...user, roles, authorities };
  }

  async history(userId: number) {
    return this.prismaService.readHistory.findMany({
      where: {
        userId,
      },
      include: {
        chapter: {
          select: {
            id: true,
            title: true,
          },
        },
        novel: true,
      },
    });
  }

  async create(providerId: string, provider: AuthProvider, { username, profileUrl }: { username: string; profileUrl: string }): Promise<UserWithAuthoritiesAndRoles> {
    const role = await this.prismaService.role.findFirstOrThrow({ where: { name: 'USER' } });

    const user = await this.prismaService.user.create({
      data: {
        username,
        about: '',
        avatar: profileUrl,
        createdAt: new Date(),
        roles: {
          create: {
            roleId: role.id,
            createdAt: new Date(),
          },
        },
        accounts: {
          create: {
            provider,
            providerId,
            createdAt: new Date(),
          },
        },
      },
    });

    return { ...user, authorities: [], roles: [role.name] };
  }

  async findUserFollowingNovels(userId: number, orderBy?: 'createdAt' | 'followCount', order: 'asc' | 'desc' = 'desc') {
    return this.prismaService.novel.findMany({
      where: {
        NovelLibrary: {
          some: {
            userId,
          },
        },
      },
      orderBy: orderBy ? { [orderBy]: order } : undefined,
      include: {
        chapters: {
          select: { id: true, title: true, createdAt: true },
          orderBy: { index: 'desc' },
          take: 1,
        },
      },
    });
  }

  async findUserUpdateChapter(userId: number) {
    return this.prismaService.chapter.findMany({
      where: {
        novel: {
          NovelLibrary: {
            some: {
              userId,
            },
          },
        },
      },
      include: {
        novel: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
            ReadHistory: {
              take: 1,
              where: {
                userId,
              },
              orderBy: {
                createdAt: 'desc',
              },
              include: {
                chapter: {
                  select: {
                    index: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        index: 'desc',
      },
    });
  }

  async get(id: number): Promise<User> {
    const user = await this.prismaService.user.findFirst({ where: { id } });

    if (!user) {
      throw new NotFound('id');
    }

    return user;
  }

  async getProfile(id: number): Promise<UserProfileResponse> {
    const user = await this.prismaService.user.findFirst({ where: { id } });

    if (!user) {
      throw new NotFound('id');
    }

    return user;
  }

  async updateProfile(id: number, session: SessionDto, updateProfileDto: UpdateProfileDto): Promise<UserProfileResponse> {
    if (session.id !== id) {
      throw new ForbiddenException();
    }

    const user = await this.prismaService.user.update({ where: { id }, data: updateProfileDto });

    if (!user) {
      throw new NotFound('id');
    }

    return user;
  }
}
