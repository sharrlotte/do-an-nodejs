import { AppConfig } from 'src/config/configuration';
import { Injectable } from '@nestjs/common';
import { GenerateContentResult, GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

const translationPrompt = 'Translated the content below to Vietnamese while maintain valid JSON structure: \n\n';

@Injectable()
export class GeminiService {
  private readonly genAi: GoogleGenerativeAI;

  constructor(private readonly configService: ConfigService<AppConfig>) {
    this.genAi = new GoogleGenerativeAI(this.configService.getOrThrow('gemini.apiKey'));
  }

  async translateBook(title: string, description: string): Promise<{ title: string; description: string }> {
    const model = this.genAi.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: 'You are an expert manga translator', //
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: { type: SchemaType.OBJECT, required: ['title', 'description'], properties: { title: { type: SchemaType.STRING }, description: { type: SchemaType.STRING } } },
      },
    });
    return await model.generateContent(`${translationPrompt} ${JSON.stringify({ title, description })}`).then(handleResult);
  }

  async translateChapter(title: string, content: string[]): Promise<{ title: string; content: string[] }> {
    const model = this.genAi.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: 'You are an expert manga translator', //
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: SchemaType.OBJECT,
          required: ['title', 'content'],
          properties: {
            title: { type: SchemaType.STRING },
            content: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.STRING,
              },
            },
          },
        },
      },
    });
    return await model.generateContent(`${translationPrompt} ${JSON.stringify({ title, content })}`).then(handleResult);
  }
}

function handleResult(result: GenerateContentResult) {
  try {
    return JSON.parse(result.response.text());
  } catch (e) {
    console.error(e, result.response);
    throw new Error('Invalid response: ' + JSON.stringify(result.response));
  }
}
