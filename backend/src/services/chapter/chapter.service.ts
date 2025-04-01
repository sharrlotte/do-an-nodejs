import { Injectable } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class ChapterService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createChapterDto: CreateChapterDto) {
    return 'This action adds a new chapter';
  }

  findAll() {
    return `This action returns all chapter`;
  }

  async findOne(id: number) {
    const current = await this.prismaService.chapter.findUniqueOrThrow({ where: { id }, include: { book: true } });
    const [next, previous] = await Promise.all([
      this.prismaService.chapter.findFirst({
        where: {
          bookId: current.bookId,
          id: {
            gt: current.id,
          },
        },
      }),
      this.prismaService.chapter.findFirst({
        where: {
          bookId: current.bookId,
          id: {
            lt: current.id,
          },
        },
      }),
    ]);

    const { book, ...data } = current;

    return {
      ...data,
      novel: book,
      nextChapterId: next?.id,
      previousChapterId: previous?.id,
    };
  }

  update(id: number, updateChapterDto: UpdateChapterDto) {
    return `This action updates a #${id} chapter`;
  }

  remove(id: number) {
    return `This action removes a #${id} chapter`;
  }
}
