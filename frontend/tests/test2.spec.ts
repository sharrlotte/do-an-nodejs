import { test, expect } from '@playwright/test';

test('Hiển thị avatar người dùng sau khi đăng nhập', async ({ page }) => {
  // Truy cập trang web
  await page.goto('https://do-an-nodejs.vercel.app/');

  // Set token vào localStorage để mô phỏng đã đăng nhập
  await page.evaluate(() => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlkIjoxLCJ1c2VybmFtZSI6IlNoYXJsb3R0ZSIsImFib3V0IjoiIiwidXBkYXRlZEF0IjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA0LTAzVDA5OjE2OjQ4LjE2NFoiLCJhdmF0YXIiOiJodHRwczovL2dpdGh1Yi5jb20vc2hhcnJsb3R0ZSIsImF1dGhvcml0aWVzIjpbXSwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NDQwMTMxOTAsImV4cCI6MTc0NDI3MjM5MH0.6w9htT_Ex-QMPj5D9SBK6qiMYsMA9kV7EBIBo1A9HiY',
    );
  });

  // Reload lại trang để token có hiệu lực
  await page.reload();

  // Kiểm tra xem avatar người dùng có hiển thị không
  const avatar = await page.getByRole('img', { name: '@shadcn' });
  await expect(avatar).toBeVisible(); // Avatar phải hiển thị khi đã đăng nhập
});

test('Kiểm tra hiển thị danh sách truyện', async ({ page }) => {
  // 1. Truy cập trang web
  await page.goto('https://do-an-nodejs.vercel.app/', { waitUntil: 'networkidle' });

  // 2. Đợi cho danh sách truyện hiển thị
  const novelGrid = page.locator('div[class*="grid"]'); // Tìm div có class chứa "grid"
  console.log('Đang chờ danh sách truyện hiển thị...');
  await novelGrid.waitFor({ state: 'visible', timeout: 20000 }); // Tăng timeout lên 20 giây
  await expect(novelGrid).toBeVisible();
  console.log('Danh sách truyện đã hiển thị');

  // 3. Kiểm tra có ít nhất một truyện hiển thị
  const novels = page.locator('div[class*="flex"]'); // Tìm các phần tử truyện (thay selector nếu cần)
  const novelCount = await novels.count();
  console.log('Số lượng truyện hiển thị:', novelCount);
  expect(novelCount).toBeGreaterThan(0); // Kiểm tra có ít nhất 1 truyện
});

test('Kiểm tra sắp xếp truyện theo số lượng theo dõi', async ({ page }) => {
  // 1. Truy cập trang web
  await page.goto('https://do-an-nodejs.vercel.app/');

  // 2. Mở menu Xếp Loại
  const xepLoaiTrigger = page.locator('button', { hasText: 'Xếp Loại' });
  await xepLoaiTrigger.click();

  // 3. Chọn tùy chọn Yêu thích nhất
  await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle' }), page.getByRole('link', { name: 'Yêu thích nhất' }).click()]);

  // 4. Đợi danh sách truyện được cập nhật
  await page.waitForSelector('section.grid', { state: 'visible', timeout: 10000 });
  await page.waitForFunction(() => {
    const grid = document.querySelector('section.grid');
    return grid && grid.children.length > 0;
  });

  // 5. Lấy danh sách số lượng theo dõi
  const danhSachTheoDoi = await page.$$eval('section.grid .text-muted-foreground', (elements) =>
    elements
      .map((el) => {
        const text = el.textContent || '';
        if (!text.includes('theo dõi')) return null;
        const match = text.match(/\d+/);
        return match ? parseInt(match[0], 10) : null;
      })
      .filter((num): num is number => num !== null),
  );

  // 6. Kiểm tra thứ tự sắp xếp (từ cao đến thấp)
  expect(danhSachTheoDoi.length).toBeGreaterThan(0);

  for (let i = 0; i < danhSachTheoDoi.length - 1; i++) {
    expect(danhSachTheoDoi[i]).toBeGreaterThanOrEqual(danhSachTheoDoi[i + 1]);
  }
});

test('kiểm tra lịch sử đọc với truyện ngẫu nhiên', async ({ page }) => {
  // 1. Truy cập trang web và đăng nhập
  await page.goto('https://do-an-nodejs.vercel.app/', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlkIjoxLCJ1c2VybmFtZSI6IlNoYXJsb3R0ZSIsImFib3V0IjoiIiwidXBkYXRlZEF0IjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA0LTAzVDA5OjE2OjQ4LjE2NFoiLCJhdmF0YXIiOiJodHRwczovL2dpdGh1Yi5jb20vc2hhcnJsb3R0ZSIsImF1dGhvcml0aWVzIjpbXSwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NDQwMTMxOTAsImV4cCI6MTc0NDI3MjM5MH0.6w9htT_Ex-QMPj5D9SBK6qiMYsMA9kV7EBIBo1A9HiY',
    );
  });
  await page.reload({ waitUntil: 'networkidle' });
  console.log('Đã đăng nhập và tải lại trang');

  // 2. Chọn một truyện ngẫu nhiên và đọc
  const novelCards = page.locator('div[class*="flex"]'); // Tìm tất cả truyện
  await novelCards.first().waitFor({ state: 'visible', timeout: 20000 });
  const novelCount = await novelCards.count();
  console.log('Số lượng truyện:', novelCount);
  expect(novelCount).toBeGreaterThan(0); // Đảm bảo có ít nhất 1 truyện

  // Chọn ngẫu nhiên một truyện
  const randomIndex = Math.floor(Math.random() * novelCount);
  const randomNovelCard = novelCards.nth(randomIndex);
  const novelTitle = (await randomNovelCard.locator('.text-lg').textContent()) || '';
  console.log('Tiêu đề truyện ngẫu nhiên:', novelTitle);
  await randomNovelCard.click();
  await page.waitForURL(/\/novel\//, { timeout: 20000 });
  console.log('Đã nhấn vào truyện ngẫu nhiên');

  // 3. Đọc chương đầu tiên
  const chapterTab = page.getByRole('tab', { name: /Chương/ });
  await chapterTab.waitFor({ state: 'visible', timeout: 20000 });
  await chapterTab.click();
  console.log('Đã nhấn vào tab Chương');

  const firstChapterLink = page.locator('a[class*="hover:bg-gray"]').first();
  await firstChapterLink.waitFor({ state: 'visible', timeout: 20000 });
  const chapterName = (await firstChapterLink.textContent()) || '';
  console.log('Tên chương đầu tiên:', chapterName);
  await firstChapterLink.click();
  await page.waitForURL(/\/chapter\//, { timeout: 20000 });
  console.log('Đã nhấn vào chương đầu tiên');

  // 4. Truy cập trang lịch sử đọc
  await page.goto('https://do-an-nodejs.vercel.app/history', { waitUntil: 'networkidle' });
  console.log('Đã truy cập trang lịch sử đọc');

  // 5. Kiểm tra xem truyện vừa đọc có trong lịch sử không
  const historyItems = page.locator('div[class*="bg-zinc"]');
  await historyItems.first().waitFor({ state: 'visible', timeout: 20000 });
  const historyCount = await historyItems.count();
  console.log('Số lượng truyện trong lịch sử đọc:', historyCount);
  expect(historyCount).toBeGreaterThan(0);

  // Tìm truyện vừa đọc trong lịch sử
  let foundInHistory = false;
  for (let i = 0; i < historyCount; i++) {
    const historyItem = historyItems.nth(i);
    const historyTitle = (await historyItem.locator('.text-xl').textContent()) || '';
    if (historyTitle === novelTitle) {
      foundInHistory = true;
      console.log('Đã tìm thấy truyện trong lịch sử:', novelTitle);
      await expect(historyItem.locator('img')).toBeVisible(); // Ảnh bìa
      await expect(historyItem.locator('.text-muted-foreground')).toBeVisible(); // Mô tả
      await expect(historyItem.getByText('Đọc tới:')).toBeVisible(); // Thông tin chương
      await expect(historyItem.getByText(chapterName)).toBeVisible(); // Kiểm tra chương đã đọc
      break;
    }
  }
  expect(foundInHistory).toBe(true); // Đảm bảo truyện vừa đọc có trong lịch sử
});

test('theo dõi truyện - nút phản hồi và đổi màu', async ({ page }) => {
  // 1. Truy cập trang web và đăng nhập
  await page.goto('https://do-an-nodejs.vercel.app/');
  await page.evaluate(() => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlkIjoxLCJ1c2VybmFtZSI6IlNoYXJsb3R0ZSIsImFib3V0IjoiIiwidXBkYXRlZEF0IjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA0LTAzVDA5OjE2OjQ4LjE2NFoiLCJhdmF0YXIiOiJodHRwczovL2dpdGh1Yi5jb20vc2hhcnJsb3R0ZSIsImF1dGhvcml0aWVzIjpbXSwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NDQwMTMxOTAsImV4cCI6MTc0NDI3MjM5MH0.6w9htT_Ex-QMPj5D9SBK6qiMYsMA9kV7EBIBo1A9HiY',
    );
  });
  await page.reload();

  // 2. Nhấn nút "Theo dõi" của một truyện
  const followButton = page.getByRole('button', { name: 'Theo dõi' });
  const initialColor = await followButton.evaluate((btn) => getComputedStyle(btn).backgroundColor); // Lấy màu ban đầu
  await followButton.click();

  // 3. Kiểm tra nút đổi màu
  const newColor = await followButton.evaluate((btn) => getComputedStyle(btn).backgroundColor);
  expect(newColor).not.toBe(initialColor);

  // 4. Kiểm tra nút đổi tên (phản hồi)
  await expect(followButton).toHaveText('Đang theo dõi'); // Thay 'Đang theo dõi' nếu cần
});

test('ngừng theo dõi truyện - nút phản hồi và đổi màu', async ({ page }) => {
  // 1. Truy cập trang web và đăng nhập
  await page.goto('https://do-an-nodejs.vercel.app/');
  await page.evaluate(() => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlkIjoxLCJ1c2VybmFtZSI6IlNoYXJsb3R0ZSIsImFib3V0IjoiIiwidXBkYXRlZEF0IjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA0LTAzVDA5OjE2OjQ4LjE2NFoiLCJhdmF0YXIiOiJodHRwczovL2dpdGh1Yi5jb20vc2hhcnJsb3R0ZSIsImF1dGhvcml0aWVzIjpbXSwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NDQwMTMxOTAsImV4cCI6MTc0NDI3MjM5MH0.6w9htT_Ex-QMPj5D9SBK6qiMYsMA9kV7EBIBo1A9HiY',
    );
  });
  await page.reload();

  // 2. Nhấn nút "Ngừng theo dõi" của một truyện (giả sử đã theo dõi trước đó)
  const unfollowButton = page.getByRole('button', { name: 'Đang theo dõi' });
  const initialColor = await unfollowButton.evaluate((btn) => getComputedStyle(btn).backgroundColor);
  await unfollowButton.click();

  // 3. Kiểm tra nút đổi màu
  const newColor = await unfollowButton.evaluate((btn) => getComputedStyle(btn).backgroundColor);
  expect(newColor).not.toBe(initialColor);

  // 4. Kiểm tra nút đổi tên (phản hồi)
  await expect(unfollowButton).toHaveText('Theo dõi');
});
test('danh sách truyện cập nhật khi theo dõi truyện', async ({ page }) => {
  // 1. Truy cập trang web và đăng nhập
  await page.goto('https://do-an-nodejs.vercel.app/');
  await page.evaluate(() => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlkIjoxLCJ1c2VybmFtZSI6IlNoYXJsb3R0ZSIsImFib3V0IjoiIiwidXBkYXRlZEF0IjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA0LTAzVDA5OjE2OjQ4LjE2NFoiLCJhdmF0YXIiOiJodHRwczovL2dpdGh1Yi5jb20vc2hhcnJsb3R0ZSIsImF1dGhvcml0aWVzIjpbXSwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NDQwMTMxOTAsImV4cCI6MTc0NDI3MjM5MH0.6w9htT_Ex-QMPj5D9SBK6qiMYsMA9kV7EBIBo1A9HiY',
    );
  });
  await page.reload();

  await page.locator('.tracking-tight').first().click();

  const btn = await page.locator('.font-medium.transition-colors');

  if ((await btn.first().innerText()) === 'Lưu') {
    await btn.click();
  }

  const title = await page.locator('h1').innerText();

  await page.goto('https://do-an-nodejs.vercel.app/follow');

  // 4. Kiểm tra truyện vừa theo dõi có trong danh sách
  await expect(page.getByText(title)).toBeVisible(); // Thay 'Tên truyện 1' bằng tên truyện thực tế
});

test('danh sách truyện cập nhật khi ngừng theo dõi truyện', async ({ page }) => {
  // 1. Truy cập trang web và đăng nhập
  await page.goto('https://do-an-nodejs.vercel.app/');
  await page.evaluate(() => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlkIjoxLCJ1c2VybmFtZSI6IlNoYXJsb3R0ZSIsImFib3V0IjoiIiwidXBkYXRlZEF0IjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA0LTAzVDA5OjE2OjQ4LjE2NFoiLCJhdmF0YXIiOiJodHRwczovL2dpdGh1Yi5jb20vc2hhcnJsb3R0ZSIsImF1dGhvcml0aWVzIjpbXSwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NDQwMTMxOTAsImV4cCI6MTc0NDI3MjM5MH0.6w9htT_Ex-QMPj5D9SBK6qiMYsMA9kV7EBIBo1A9HiY',
    );
  });
  await page.reload();

  // 2. Nhấn nút "Ngừng theo dõi" của một truyện
  await page.getByRole('button', { name: 'Đang theo dõi' }).click();

  // 3. Truy cập danh sách Theo Dõi
  await page.getByRole('link', { name: 'Theo Dõi' }).click();

  // 4. Kiểm tra truyện vừa ngừng theo dõi không còn trong danh sách
  await expect(page.getByText('Tên truyện 1')).not.toBeVisible(); // Thay 'Tên truyện 1' bằng tên truyện thực tế
});

test('tìm kiếm truyện', async ({ page }) => {
  // 1. Truy cập trang web
  await page.goto('https://do-an-nodejs.vercel.app/');

  // 2. Nhập từ khóa tìm kiếm
  await page.getByPlaceholder('Bạn đang tìm kiếm những gì ?').fill('Quan Đồ'); // Thay placeholder nếu cần

  await page.waitForTimeout(2000); // Đợi 2 giây để kết quả tìm kiếm hiển thị
  // 4. Kiểm tra kết quả tìm kiếm
  await expect(page.getByText('Quan Đồ').first()).toBeVisible();
});
