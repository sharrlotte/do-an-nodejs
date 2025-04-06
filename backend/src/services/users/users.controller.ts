import { Body, Controller, Get, Param, ParseIntPipe, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { getSession, getSessionOrNull } from 'src/services/auth/auth.utils';
import { Roles } from 'src/shared/decorator/role.decorator';
import { Request } from 'express';
import { UsersService } from 'src/services/users/users.service';
import { UserProfileResponse, UserResponse } from 'src/services/users/dto/user.response';
import { UpdateProfileDto } from 'src/services/users/dto/update-profile.dto';
import { RolesGuard } from 'src/shared/guard/role.guard';
import { SessionResponseDto } from 'src/services/auth/dto/session.dto';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { CurrentUser } from 'src/shared/decorator/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/session')
  getSession(@Req() req: Request): SessionResponseDto | null {
    const session = getSessionOrNull(req);

    if (session === null) {
      return null;
    }

    return plainToInstance(SessionResponseDto, {
      ...session,
      rolePicked: !session.roles.some((role) => role === 'CANDIDATE' || role === 'RECRUITER'),
    });
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return plainToInstance(UserResponse, this.userService.get(id));
  }

  @Get(':id/profile')
  getProfile(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return plainToInstance(UserProfileResponse, this.userService.getProfile(id));
  }

  @Get('@me/profile')
  getMeProfile(@Req() req: Request) {
    const session = getSession(req);
    return plainToInstance(UserProfileResponse, this.userService.getProfile(session.id));
  }

  @Get('@me/history')
  @UseGuards(AuthGuard)
  isFollow(@CurrentUser('id') userId: number) {
    return this.userService.history(userId);
  }

  @Roles(['USER'])
  @UseGuards(RolesGuard)
  @Patch('@me/profile')
  updateProfile(@Param('id', ParseIntPipe) id: number, @Req() req: Request, @Body() updateProfileDto: UpdateProfileDto) {
    const session = getSession(req);

    return plainToInstance(UserProfileResponse, this.userService.updateProfile(id, session, updateProfileDto));
  }

  @Get('@me/following')
  @UseGuards(AuthGuard)
  findUserFollowingNovels(@CurrentUser('id') userId: number, @Query('orderBy') orderBy?: 'createdAt' | 'followCount', @Query('order') order: 'asc' | 'desc' = 'desc') {
    return this.userService.findUserFollowingNovels(userId, orderBy, order);
  }

  @Get('@me/update')
  @UseGuards(AuthGuard)
  findUserUpdateChapter(@CurrentUser('id') userId: number) {
    return this.userService.findUserUpdateChapter(userId);
  }
}
