import { test, expect } from '@playwright/test';

const BASE_URL = 'https://do-an-nodejs.vercel.app/';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlkIjoxLCJ1c2VybmFtZSI6IlNoYXJsb3R0ZSIsImFib3V0IjoiIiwidXBkYXRlZEF0IjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA0LTAzVDA5OjE2OjQ4LjE2NFoiLCJhdmF0YXIiOiJodHRwczovL2dpdGh1Yi5jb20vc2hhcnJsb3R0ZSIsImF1dGhvcml0aWVzIjpbXSwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NDQwMTMxOTAsImV4cCI6MTc0NDI3MjM5MH0.6w9htT_Ex-QMPj5D9SBK6qiMYsMA9kV7EBIBo1A9HiY';

// TC019 - Hiển thị list chương khi nhấn vào tab "Chương"
test('TC019 - Hiển thị list chương khi nhấn vào tab "Chương"', async ({ page }) => {
  // Pre-condition: Không có

  // Step 1: Click vào tab "Chương"
  // Step 2: Kiểm tra có "Danh sách chương"
  await page.goto(BASE_URL);
  await page.locator('.tracking-tight').first().click();
  await page.waitForURL('**/novels/**');
  await page.getByRole('tab').first().click();
  // Expected Result: Không có thẻ "Danh sách chương" hoặc có thẻ "Danh sách chương"
  await expect(page.getByText('Danh sách chương')).toBeVisible();
});

// TC020 - Truy cập chương truyện khi bấm vào link "Chương"
test('TC020 - Truy cập chương truyện khi bấm vào link "Chương"', async ({ page }) => {
  // Pre-condition: Không có

  // Step 1: Click vào tab "Chương"
  // Step 2: Click vào heading có tên "Chương"
  // Step 3: Kiểm tra có Button "Danh sách chương"
  // Step 4: Kiểm tra có link "Chapter trước", "Chapter kế"
  await page.goto(BASE_URL);
  await page.locator('.relative.w-full.flex-shrink-0').first().click();
  await page.waitForURL('**/novels/**');
  await page.getByRole('tab').first().click();
  await page.locator('a[href*="/novels"]').first().click();
  // Expected Result: Không hiển thị các thành phần kiểm tra khi click vào link "Render thành công các thành phần kiểm tra"
  await expect(page.locator('#content')).toBeVisible();
  // Check for navigation buttons
  await expect(page.getByRole('link', { name: /Chapter (trước|kế)/i }).first()).toBeVisible();
});

// TC021 - Chuyển chapter trước khi click vào link "Chapter trước" để chuyển tới chương phía trước
test('TC021 - Chuyển chapter trước khi click vào link "Chapter trước" để chuyển tới chương phía trước', async ({ page }) => {
  // Pre-condition: Không có

  // Step 1: Click vào link "Chapter trước"
  // Step 2: Kiểm tra đường dẫn ".../chapter-id-1"
  await page.goto('https://do-an-nodejs.vercel.app/novels/5/chapters/118');
  const previousBtn = page.getByRole('link', { name: 'Chapter trước' }).first();
  await expect(previousBtn).toBeVisible();
  const prevHref = await previousBtn.getAttribute('href');

  await previousBtn.click();

  // Expected Result: Đường dẫn không thay đổi hoặc đường dẫn thay đổi theo đúng kiểu ".../chapter-id-1"
  await expect(page).toHaveURL(new RegExp(`${prevHref}$`));
});

// TC022 - Chuyển chapter sau khi click vào link "Chapter kế" để chuyển tới chương phía sau tiếp
test('TC022 - Chuyển chapter sau khi click vào link "Chapter kế" để chuyển tới chương phía sau tiếp', async ({ page }) => {
  // Pre-condition: Không có

  // Step 1: Click vào link "Chapter trước"
  // Step 2: Kiểm tra đường dẫn ".../chapter-id+1"
  await page.goto('https://do-an-nodejs.vercel.app/novels/5/chapters/118');
  const nextBtn = page.getByRole('link', { name: 'Chapter kế' });
  await expect(nextBtn).toBeVisible();
  const nextHref = await nextBtn.getAttribute('href');

  await nextBtn.click();

  // Expected Result: Đường dẫn không thay đổi hoặc đường dẫn thay đổi theo đúng kiểu ".../chapter-id+1"
  await expect(page).toHaveURL(new RegExp(`${nextHref}$`));
});
