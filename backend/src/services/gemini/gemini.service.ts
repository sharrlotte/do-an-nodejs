import { AppConfig } from 'src/config/configuration';
import { Injectable } from '@nestjs/common';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiService {
  private readonly model: GenerativeModel;

  constructor(private readonly configService: ConfigService<AppConfig>) {
    const genAI = new GoogleGenerativeAI(this.configService.getOrThrow('gemini.apiKey'));
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash', generationConfig: { responseMimeType: 'application/json' } });
  }

  async prompt(prompt: string) {
    return await this.model.generateContent(prompt).then((res) => res.response.text());
  }
}
