import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/services/auth/auth.module';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { RoleModule } from 'src/services/role/role.module';
import { UsersModule } from 'src/services/users/users.module';
import { CloudinaryService } from './services/cloudinary/cloudinary.service';
import { CloudinaryModule } from './services/cloudinary/cloudinary.module';
import appConfig from 'src/config/configuration';
import { MulterModule } from '@nestjs/platform-express';
import { AuthMiddleware } from 'src/services/auth/auth.middleware';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { AuthoritiesModule } from './services/authorities/authorities.module';
import { RoleAuthoritiesModule } from './services/role-authorities/role-authorities.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from 'src/services/tasks/task.module';
import { GeminiModule } from 'src/services/gemini/gemini.module';
import { NovelModule } from './services/novel/novel.module';
import { ChapterModule } from './services/chapter/chapter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.development.env'],
      cache: true,
      load: [appConfig],
    }),
    MulterModule.register({
      dest: './upload',
    }),
    ScheduleModule.forRoot(),
    NestjsFormDataModule.config({ isGlobal: true, storage: MemoryStoredFile }),
    AuthModule,
    UsersModule,
    PrismaModule,
    RoleModule,
    CloudinaryModule,
    AuthoritiesModule,
    RoleAuthoritiesModule,
    TaskModule,
    GeminiModule,
    NovelModule,
    ChapterModule,
  ],
  providers: [CloudinaryService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
