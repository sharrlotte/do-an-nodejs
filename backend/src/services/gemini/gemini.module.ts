import { Module } from '@nestjs/common';
import { GeminiService } from 'src/services/gemini/gemini.service';

@Module({
  providers: [GeminiService],
})
export class GeminiModule {}
