import { Injectable } from '@nestjs/common';
import { CreateNovelDto } from './dto/create-novel.dto';
import { UpdateNovelDto } from './dto/update-novel.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class NovelService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createNovelDto: CreateNovelDto) {
    return 'This action adds a new novel';
  }

  findAll() {
    return this.prismaService.book.findMany();
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
}
