import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { NovelService } from './novel.service';
import { CreateNovelDto } from './dto/create-novel.dto';
import { UpdateNovelDto } from './dto/update-novel.dto';
import { CurrentUser } from 'src/shared/decorator/current-user.decorator';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { RolesGuard } from 'src/shared/guard/role.guard';
import { Roles } from 'src/shared/decorator/role.decorator';

@Controller('novels')
export class NovelController {
  constructor(private readonly novelService: NovelService) {}

  @Post(':id/categories')
  @UseGuards(RolesGuard)
  @Roles(['ADMIN'])
  addCategory(@Param('id', ParseIntPipe) novelId: number, @Body('categoryId', ParseIntPipe) categoryId: number) {
    return this.novelService.addCategory(novelId, categoryId);
  }

  @Post('isFollow')
  @UseGuards(AuthGuard)
  isFollow(@CurrentUser('id') userId: number, @Body() novelId: number[]) {
    return this.novelService.isFollow(userId, novelId);
  }

  @Post()
  create(@Body() createNovelDto: CreateNovelDto) {
    return this.novelService.create(createNovelDto);
  }

  @Get('search')
  search(@Query('q') q: string) {
    return this.novelService.search(q);
  }

  @Get()
  findAll(@Query('q') q: string, @Query('category') category?: string[], @Query('orderBy') orderBy?: 'chapterCount' | 'createdAt' | 'followCount', @Query('order') order: 'asc' | 'desc' = 'desc') {
    return this.novelService.findAll(q, category, orderBy, order);
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

  @Get(':id/chapters/:chapterId/read')
  @UseGuards(AuthGuard)
  read(@CurrentUser('id') userId: number, @Param('id', ParseIntPipe) novelId: number, @Param('chapterId', ParseIntPipe) chapterId: number) {
    return this.novelService.read(userId, novelId, chapterId);
  }

  @Delete(':id/categories/:categoryId')
  @UseGuards(RolesGuard)
  @Roles(['ADMIN'])
  removeCategory(@Param('id', ParseIntPipe) novelId: number, @Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.novelService.removeCategory(novelId, categoryId);
  }
}
