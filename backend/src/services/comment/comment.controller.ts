import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards, DefaultValuePipe } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { CurrentUser } from 'src/shared/decorator/current-user.decorator';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@CurrentUser('id') id: number, @Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(id, createCommentDto);
  }

  @Get()
  findAll(@Query('chapterId', new DefaultValuePipe(-1), new ParseIntPipe({ optional: true })) chapterId?: number, @Query('novelId', ParseIntPipe) novelId?: number) {
    return this.commentService.findAll(novelId, chapterId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
