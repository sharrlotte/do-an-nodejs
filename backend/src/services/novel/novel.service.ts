import { Injectable } from '@nestjs/common';
import { CreateNovelDto } from './dto/create-novel.dto';
import { UpdateNovelDto } from './dto/update-novel.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';
import { Novel } from '@prisma/client';

@Injectable()
export class NovelService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createNovelDto: CreateNovelDto) {
    return 'This action adds a new novel';
  }

  random() {
    return this.prismaService.$queryRawUnsafe<Novel>(`
      SELECT 
        "Novel".id,
        "Novel".title,
        "Novel".description,
        "Novel"."imageUrl",
        "Novel".src,
        "Novel"."srcUpdated",
        "Novel"."updatedAt",
        "Novel"."createdAt",
        "Novel"."followCount",
        "Novel"."commentCount",
        "Novel"."chapterCount",
        COALESCE(
          json_agg(
            json_build_object(
              'id', "Chapter".id,
              'title', "Chapter".title,
              'createdAt', "Chapter"."createdAt"
            ) ORDER BY "Chapter".index DESC
          ) FILTER (WHERE "Chapter".id IS NOT NULL),
          '[]'
        )::jsonb as chapters
      FROM "Novel"
      LEFT JOIN "Chapter" ON "Chapter"."novelId" = "Novel".id
      GROUP BY "Novel".id
      ORDER BY random()
      LIMIT 1;
    `);
  }

  findAll(orderBy?: 'chapterCount' | 'createdAt' | 'followCount', order: 'asc' | 'desc' = 'desc') {
    return this.prismaService.novel.findMany({
      orderBy: orderBy ? { [orderBy]: order } : undefined,
    });
  }

  search(q: string) {
    return this.prismaService.novel.findMany({
      where: {
        title: {
          contains: q,
          mode: 'insensitive',
        },
      },
      orderBy: {
        followCount: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.novel.findUnique({ where: { id }, include: { chapters: { select: { id: true, title: true, createdAt: true }, orderBy: { index: 'desc' } } } });
  }

  update(id: number, updateNovelDto: UpdateNovelDto) {
    return `This action updates a #${id} novel`;
  }

  remove(id: number) {
    return `This action removes a #${id} novel`;
  }

  async follow(userId: number, novelId: number) {
    try {
      const [novelLibrary, book] = await this.prismaService.$transaction([
        this.prismaService.novelLibrary.create({
          data: {
            userId,
            novelId,
          },
        }),
        this.prismaService.novel.update({
          where: { id: novelId },
          data: {
            followCount: { increment: 1 },
          },
        }),
      ]);
      return novelLibrary;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('You have already followed this book');
      }
      throw error;
    }
  }

  async unfollow(userId: number, novelId: number) {
    const [novelLibrary, book] = await this.prismaService.$transaction([
      this.prismaService.novelLibrary.delete({
        where: {
          userId_novelId: {
            userId,
            novelId,
          },
        },
      }),
      this.prismaService.novel.update({
        where: { id: novelId },
        data: {
          followCount: { decrement: 1 },
        },
      }),
    ]);
    return novelLibrary;
  }

  async isFollow(userId: number, novelId: number) {
    const novelLibrary = await this.prismaService.novelLibrary.findUnique({
      where: {
        userId_novelId: {
          userId,
          novelId,
        },
      },
    });
    return novelLibrary !== null;
  }

  async read(userId: number, novelId: number, chapterId: number) {
    const readHistory = await this.prismaService.readHistory.findUnique({
      where: {
        userId_novelId: {
          userId,
          novelId,
        },
      },
    });

    if (!readHistory) {
      return this.prismaService.readHistory.create({
        data: {
          novelId,
          chapterId,
          userId,
        },
      });
    }

    if (readHistory.chapterId < chapterId) {
      return this.prismaService.readHistory.update({
        where: { id: readHistory.id },
        data: {
          chapterId,
        },
      });
    }
  }
}
