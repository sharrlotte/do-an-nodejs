import { Module } from '@nestjs/common';
import { TasksService } from './task.service';
import { GeminiService } from 'src/services/gemini/gemini.service';

@Module({
  providers: [TasksService, GeminiService],
})
export class TaskModule {}
