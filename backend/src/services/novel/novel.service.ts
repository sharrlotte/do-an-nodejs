import { Injectable, NotFoundException } from '@nestjs/common';
import { NovelCategory } from '@prisma/client';
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
        )::jsonb as chapters,
        COALESCE(
          json_agg(DISTINCT "Category".name) FILTER (WHERE "Category".name IS NOT NULL),
          '[]'
        )::jsonb as categories
      FROM "Novel"
      LEFT JOIN "Chapter" ON "Chapter"."novelId" = "Novel".id
      LEFT JOIN "NovelCategory" ON "NovelCategory"."novelId" = "Novel".id
      LEFT JOIN "Category" ON "Category".id = "NovelCategory"."categoryId"
      GROUP BY "Novel".id
      ORDER BY random()
      LIMIT 1;
    `);
  }

  findAll(q?: string, category?: string[], orderBy?: 'chapterCount' | 'createdAt' | 'followCount', order: 'asc' | 'desc' = 'desc') {
    return this.prismaService.novel
      .findMany({
        where: {
          title: q
            ? {
                contains: q,
                mode: 'insensitive',
              }
            : undefined,
          NovelCategory: category
            ? {
                some: {
                  category: {
                    name: {
                      in: category,
                    },
                  },
                },
              }
            : undefined,
        },
        orderBy: orderBy ? { [orderBy]: order } : undefined,
        include: {
          NovelCategory: {
            select: {
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      })
      .then((res) => res.map((item) => ({ ...item, categories: item.NovelCategory.map((i) => i.category.name) })));
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
      include: {
        NovelCategory: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.novel
      .findUniqueOrThrow({
        where: { id },
        include: {
          chapters: {
            select: { id: true, title: true, createdAt: true },
            orderBy: { index: 'desc' },
          },
          NovelCategory: {
            select: {
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      })
      .then((item) => ({ ...item, categories: item.NovelCategory.map((i) => i.category.name) }));
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

  async addCategory(novelId: number, categoryId: number) {
    // Check if novel exists
    const novel = await this.prismaService.novel.findUnique({
      where: { id: novelId },
    });

    if (!novel) {
      throw new NotFoundException(`Novel with ID ${novelId} not found`);
    }

    // Check if category exists
    const category = await this.prismaService.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    // Add category to novel
    return this.prismaService.novelCategory.create({
      data: {
        novelId,
        categoryId,
      },
    });
  }

  async removeCategory(novelId: number, categoryId: number) {
    // Check if novel exists
    const novel = await this.prismaService.novel.findUnique({
      where: { id: novelId },
    });

    if (!novel) {
      throw new NotFoundException(`Novel with ID ${novelId} not found`);
    }

    // Check if category exists
    const category = await this.prismaService.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    // Remove category from novel
    return this.prismaService.novelCategory.delete({
      where: {
        novelId_categoryId: {
          novelId,
          categoryId,
        },
      },
    });
  }

  async isFollow(userId: number, novelId: number[]) {
    const novelLibrary = await this.prismaService.novelLibrary.findMany({
      where: {
        userId,
        novelId: {
          in: novelId,
        },
      },
    });

    return novelLibrary.map((r) => r.novelId);
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
