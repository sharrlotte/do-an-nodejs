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
    await this.crawBook();
    await this.crawlChapters();
  }

  async onModuleInit() {
    // this.crawBook().then(() => this.crawlChapters());
  }

  private async crawlChapters() {
    const books = await this.prismaService.novel.findMany();
    // ONLY crawl the first book for testing purposes
    const chapterLinks: { id: number; src: string; title: string }[] = [];
    for (const book of books) {
      try {
        console.log('Crawl book:', book);
        // Create browser and page
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Navigate to the book's detail page
        await page.goto(book.src + 'list.html');
        // Get .more > a and click it to see list of chapters
        const moreBtn = await page.$('.more > a');
        if (moreBtn) {
          await moreBtn.click();
          // Wait for .more > a not appear any more
          await page.waitForSelector('.more > a', { hidden: true });
        }

        // Get all the chapter links from [itemprop=itemListElement] > a, and title from [itemprop=itemListElement] > a > span
        const chapterLinksElements = await page.$$('[itemprop=itemListElement] > a');

        for (const chapterLinkElement of chapterLinksElements) {
          const src = await chapterLinkElement.evaluate((el) => el.href);
          const title = await chapterLinkElement.evaluate((el) => el.textContent?.trim() || '');
          if (!src || !title) {
            console.log('No src or title: ' + chapterLinkElement.evaluate((el) => el.textContent?.trim() || ''));
          } else {
            console.log('Found chapter:', src, title);
            chapterLinks.push({ id: book.id, src, title });
          }
        }

        // Go to ech chapter link, and crawl the content
        for (let index = 0; index < chapterLinks.length; index++) {
          const chapterLink = chapterLinks[index];

          try {
            // if src exists, break
            const exists = await this.prismaService.chapter.findUnique({
              where: {
                src: chapterLink.src,
              },
            });

            if (exists) {
              continue;
            }

            console.log('Crawl chapter:', chapterLink);

            await page.goto(chapterLink.src);
            // Get div with id=content > p as list of paragraphs
            const paragraphs = await page.$$('div#content > p');
            const content = await Promise.all(paragraphs.map((p) => p.evaluate((el) => el.textContent?.trim() || '')));
            // Translate the content before saving to database
            const translated = await this.geminiService.translateChapter(chapterLink.title, content);
            const chapter = await this.prismaService.chapter.create({
              data: {
                title: translated.title,
                content: translated.content,
                src: chapterLink.src,
                index,
                novel: {
                  connect: {
                    id: chapterLink.id,
                  },
                },
              },
            });

            console.log('Added:', chapter);
          } catch (e) {
            console.error(e);
          }
        }

        await browser.close();
      } catch (e) {
        console.error(e);
      }
    }
  }

  private async crawBook() {
    let books: Book[] = [];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.quanben.io/');
    await page.setViewport({ width: 1920, height: 1080 });

    // console.log(await page.content())

    // Wait for the book elements to load
    await page.waitForSelector('[itemprop=itemListElement] > a');
    const allBookLinks = await page.$$eval('[itemprop=itemListElement] > a', (links) => links.map((link) => link.href));
    // ONLY crawl the first 10 books for testing purposes
    for (const src of allBookLinks) {
      try {
        // Check if the book already exists in the database
        const exists = await this.prismaService.novel.findUnique({
          where: { src },
        });
        if (exists) {
          continue;
        }

        // Navigate to the book's detail page
        await page.goto(src);

        // Wait for the necessary elements to load on the detail page
        await page.waitForSelector('.list2 > img');

        // Extract the image URL
        const imageUrlSrc = await page.$eval('.list2 > img', (img) => img.src);

        // Extract the title
        const titleText = await page.$eval('h3 > span', (span) => span.textContent?.trim() || '');

        // Extract the description
        const descriptionText = await page.$eval('.description', (div) => div.textContent?.trim() || '');

        const translated = await this.geminiService.translateBook(titleText, descriptionText);

        const data = {
          title: translated.title,
          description: translated.description,
          src,
          imageUrl: imageUrlSrc,
        };

        books.push(data);
        console.log('Added:', data);
      } catch (e) {
        console.error('Error processing book:', src, e);
      }
    }

    await this.prismaService.novel.createMany({ data: books });
    books = [];

    // const pageContainer = await page.$('.qm-page-number');
    // const pageNumbers = await pageContainer?.$$('a[data-page]');

    // if (!pageNumbers || pageNumbers.length === 0) {
    //   throw new Error('No page numbers');
    // }

    // const pageNumbersText: number[] = (await Promise.all(pageNumbers.map((r) => r.evaluate((el) => parseInt(el.textContent ?? '', 10)).catch(() => null)).filter(Boolean))) as unknown as any;

    // const lastPage = Math.max(...pageNumbersText.filter(Number.isInteger));

    // // Only crawl the first page, for testing purposes
    // for (let pageNumber = 0; pageNumber < 1; pageNumber++) {
    //   console.log('Crawl page: ' + pageNumber + ' of ' + lastPage);
    //   await page.goto(`https://www.qimao.com/shuku/a-a-a-a-a-a-a-click-${pageNumber}/`);

    //   const allBookList = await page.locator('.books-pic-con').waitHandle();

    //   const booksData = (await allBookList?.$$('li')) ?? [];

    //   for (const bookData of booksData) {
    //     try {
    //       const [src, title] = await bookData.$eval('.s-tit > a', (el) => [el.href, el.text]);

    //       const exists = await this.prismaService.novel.findUnique({
    //         where: {
    //           src,
    //         },
    //       });

    //       if (exists) {
    //         continue;
    //       }

    //       if (!src) {
    //         console.log('No src, skip: ' + (await bookData.jsonValue()));
    //         continue;
    //       }

    //       const imageUrl = await bookData.$eval('img', (el) => el.src);

    //       if (!imageUrl) {
    //         console.log('No image link ,skip: ' + src);
    //         continue;
    //       }

    //       const description = await bookData.$eval('.s-des', (el) => el.textContent);

    //       if (!description) {
    //         console.log('No content ,skip: ' + src);
    //         continue;
    //       }

    //       const translatedText = await this.geminiService.prompt(JSON.stringify({ title, description }) + '/n/n/n Dịch đoạn văn bản này sang tiếng Việt, dữ nguyên ngữ cảnh, văn phong, chỉ trả về đoạn văn bản được dịch giữ nguyên cấu trúc JSON');
    //       const translated = JSON.parse(translatedText);

    //       const data = {
    //         title: translated.title,
    //         description: translated.description,
    //         src,
    //         imageUrl,
    //       };

    //       books.push(data);

    //       console.log('Added: ' + data);
    //     } catch (e) {
    //       console.error(e);
    //     }
    //   }
    //   await this.prismaService.novel.createMany({ data: books });
    //   books = [];
    // }

    await browser.close();

    return books;
  }
}
