import { Injectable } from '@nestjs/common';
import { CreateNovelDto } from './dto/create-novel.dto';
import { UpdateNovelDto } from './dto/update-novel.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class NovelService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createNovelDto: CreateNovelDto) {
    return 'This action adds a new novel';
  }

  findAll(orderBy?: 'createdAt' | 'followCount', order: 'asc' | 'desc' = 'desc') {
    return this.prismaService.book.findMany({
      orderBy: orderBy ? { [orderBy]: order } : undefined,
    });
  }

  findOne(id: number) {
    return this.prismaService.book.findUnique({ where: { id }, include: { chapters: { select: { id: true, title: true, createdAt: true }, orderBy: { index: 'desc' } } } });
  }

  update(id: number, updateNovelDto: UpdateNovelDto) {
    return `This action updates a #${id} novel`;
  }

  remove(id: number) {
    return `This action removes a #${id} novel`;
  }

  async follow(userId: number, bookId: number) {
    try {
      const [bookLibrary, book] = await this.prismaService.$transaction([
        this.prismaService.bookLibrary.create({
          data: {
            userId,
            bookId,
          },
        }),
        this.prismaService.book.update({
          where: { id: bookId },
          data: {
            followCount: { increment: 1 },
          },
        }),
      ]);
      return bookLibrary;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('You have already followed this book');
      }
      throw error;
    }
  }

  async unfollow(userId: number, bookId: number) {
    const [bookLibrary, book] = await this.prismaService.$transaction([
      this.prismaService.bookLibrary.delete({
        where: {
          userId_bookId: {
            userId,
            bookId,
          },
        },
      }),
      this.prismaService.book.update({
        where: { id: bookId },
        data: {
          followCount: { decrement: 1 },
        },
      }),
    ]);
    return bookLibrary;
  }

  async isFollow(userId: number, bookId: number) {
    const bookLibrary = await this.prismaService.bookLibrary.findUnique({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
    });
    return bookLibrary !== null;
  }

  async findUserFollowingNovels(userId: number, orderBy?: 'createdAt' | 'followCount', order: 'asc' | 'desc' = 'desc') {
    return this.prismaService.book.findMany({
      where: {
        BookLibrary: {
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
        },
      },
    });
  }
}
