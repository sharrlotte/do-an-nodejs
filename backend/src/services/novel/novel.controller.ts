import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { NovelService } from './novel.service';
import { CreateNovelDto } from './dto/create-novel.dto';
import { UpdateNovelDto } from './dto/update-novel.dto';
import { CurrentUser } from 'src/shared/decorator/current-user.decorator';
import { AuthGuard } from 'src/services/auth/auth.guard';

@Controller('novels')
export class NovelController {
  constructor(private readonly novelService: NovelService) {}

  @Post()
  create(@Body() createNovelDto: CreateNovelDto) {
    return this.novelService.create(createNovelDto);
  }

  @Get('search')
  search(@Query('q') q: string) {
    return this.novelService.search(q);
  }

  @Get()
  findAll(@Query('orderBy') orderBy?: 'chapterCount' | 'createdAt' | 'followCount', @Query('order') order: 'asc' | 'desc' = 'desc') {
    return this.novelService.findAll(orderBy, order);
  }

  @Get('random')
  findRandom() {
    return this.novelService.random();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.novelService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNovelDto: UpdateNovelDto) {
    return this.novelService.update(+id, updateNovelDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.novelService.remove(id);
  }

  @Post(':id/follow')
  @UseGuards(AuthGuard)
  follow(@CurrentUser('id') userId: number, @Param('id', ParseIntPipe) novelId: number) {
    return this.novelService.follow(userId, novelId);
  }

  @Delete(':id/follow')
  @UseGuards(AuthGuard)
  unfollow(@CurrentUser('id') userId: number, @Param('id', ParseIntPipe) novelId: number) {
    return this.novelService.unfollow(userId, novelId);
  }

  @Get(':id/follow')
  @UseGuards(AuthGuard)
  isFollow(@CurrentUser('id') userId: number, @Param('id', ParseIntPipe) novelId: number) {
    return this.novelService.isFollow(userId, novelId);
  }

  @Get(':id/chapters/:chapterId/read')
  @UseGuards(AuthGuard)
  read(@CurrentUser('id') userId: number, @Param('id', ParseIntPipe) novelId: number, @Param('chapterId', ParseIntPipe) chapterId: number) {
    return this.novelService.read(userId, novelId, chapterId);
  }
}
