import { PrismaService } from 'src/services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}
  create(id: number, createCommentDto: CreateCommentDto) {
    if (createCommentDto.chapterId) {
      return this.prismaService.$transaction([
        this.prismaService.chapter.update({
          where: {
            id: createCommentDto.chapterId,
          },
          data: {
            commentCount: {
              increment: 1,
            },
          },
        }),
        this.prismaService.book.update({
          where: {
            id: createCommentDto.novelId,
          },
          data: {
            commentCount: {
              increment: 1,
            },
          },
        }),
        this.prismaService.comment.create({
          data: {
            ...createCommentDto,
            userId: id,
          },
        }),
      ]);
    } else {
      return this.prismaService.$transaction([
        this.prismaService.book.update({
          where: {
            id: createCommentDto.novelId,
          },
          data: {
            commentCount: {
              increment: 1,
            },
          },
        }),
        this.prismaService.comment.create({
          data: {
            ...createCommentDto,
            userId: id,
          },
        }),
      ]);
    }
  }

  findAll(novelId?: number, chapterId?: number) {
    if (chapterId !== undefined && chapterId < 0) {
      return this.prismaService.comment.findMany({
        where: {
          novelId,
        },
        orderBy: {
          id: 'desc',
        },
      });
    }
    return this.prismaService.comment.findMany({
      where: {
        novelId,
        chapterId,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.comment.findUnique({ where: { id } });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
