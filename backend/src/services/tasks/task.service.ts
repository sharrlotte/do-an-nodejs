import { PrismaService } from './../prisma/prisma.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import puppeteer from 'puppeteer';
import { GeminiService } from 'src/services/gemini/gemini.service';

type Book = {
  title: string;
  description: string;
  src: string;
  imageUrl: string;
};

@Injectable()
export class TasksService implements OnModuleInit {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly geminiService: GeminiService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  private async handleCron() {
    // await this.crawlQimao();
  }

  async onModuleInit() {
    // await this.crawlQimao();
  }

  private async crawlQimao() {
    let books: Book[] = [];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.qimao.com/shuku/a-a-a-a-a-a-a-click-1/');
    await page.setViewport({ width: 1920, height: 1080 });
    const pageContainer = await page.$('.qm-page-number');
    const pageNumbers = await pageContainer?.$$('a[data-page]');

    if (!pageNumbers || pageNumbers.length === 0) {
      throw new Error('No page numbers');
    }

    const pageNumbersText: number[] = (await Promise.all(pageNumbers.map((r) => r.evaluate((el) => parseInt(el.textContent ?? '', 10)).catch(() => null)).filter(Boolean))) as unknown as any;

    const lastPage = Math.max(...pageNumbersText.filter(Number.isInteger));

    for (let pageNumber = 0; pageNumber < lastPage; pageNumber++) {
      console.log('Crawl page: ' + pageNumber + ' of ' + lastPage);
      await page.goto(`https://www.qimao.com/shuku/a-a-a-a-a-a-a-click-${pageNumber}/`);

      const allBookList = await page.locator('.books-pic-con').waitHandle();

      const booksData = (await allBookList?.$$('li')) ?? [];

      for (const bookData of booksData) {
        try {
          const [src, title] = await bookData.$eval('.s-tit > a', (el) => [el.href, el.text]);

          const exists = await this.prismaService.book.findUnique({
            where: {
              src,
            },
          });

          if (exists) {
            continue;
          }

          if (!src) {
            console.log('No src, skip: ' + (await bookData.jsonValue()));
            continue;
          }

          const imageUrl = await bookData.$eval('img', (el) => el.src);

          if (!imageUrl) {
            console.log('No image link ,skip: ' + src);
            continue;
          }

          const description = await bookData.$eval('.s-des', (el) => el.textContent);

          if (!description) {
            console.log('No content ,skip: ' + src);
            continue;
          }

          const translatedText = await this.geminiService.prompt(JSON.stringify({ title, description }) + '/n/n/n Dịch đoạn văn bản này sang tiếng Việt, dữ nguyên ngữ cảnh, văn phong, chỉ trả về đoạn văn bản được dịch giữ nguyên cấu trúc JSON');
          const translated = JSON.parse(translatedText);

          const data = {
            title: translated.title,
            description: translated.description,
            src,
            imageUrl,
          };

          books.push(data);

          console.log('Added: ' + data);
          
        } catch (e) {
          console.error(e);
        }
      }
      await this.prismaService.book.createMany({ data: books });
      books = [];
    }

    await browser.close();

    return books;
  }
}
