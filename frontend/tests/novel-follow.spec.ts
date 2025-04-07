import { test, expect } from '@playwright/test';

const BASE_URL = 'https://do-an-nodejs.vercel.app/';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlkIjoxLCJ1c2VybmFtZSI6IlNoYXJsb3R0ZSIsImFib3V0IjoiIiwidXBkYXRlZEF0IjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA0LTAzVDA5OjE2OjQ4LjE2NFoiLCJhdmF0YXIiOiJodHRwczovL2dpdGh1Yi5jb20vc2hhcnJsb3R0ZSIsImF1dGhvcml0aWVzIjpbXSwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NDQwMTMxOTAsImV4cCI6MTc0NDI3MjM5MH0.6w9htT_Ex-QMPj5D9SBK6qiMYsMA9kV7EBIBo1A9HiY';

test('TC011 - Theo dõi truyện bằng icon flash đầu ở trang chủ', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', TOKEN);
  });
  await page.goto(BASE_URL);
  const followIcon = page.locator('.lucide.lucide-bookmark').nth(1);

  await followIcon.evaluate((el) => el.parentElement?.classList.remove('hidden'));

  await page.waitForTimeout(1000);

  if ((await followIcon.getAttribute('fill')) === 'yellow') {
    await followIcon.click();
  }

  await followIcon.evaluate((el) => el.parentElement?.classList.remove('hidden'));
  await page.waitForTimeout(1000);
  await followIcon.click();
  await page.waitForTimeout(1000);
  await expect(followIcon).toHaveAttribute('fill', 'yellow');
});

test('TC013 - Theo dõi truyện bằng Button "Lưu" ở trang chi tiết truyện', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', TOKEN);
  });
  await page.goto(BASE_URL);
  const followIcon = page.locator('.lucide.lucide-bookmark').nth(1);
  const saveBtn = page.getByRole('button', { name: 'Lưu' });
  await saveBtn.click();
  await expect(saveBtn).toHaveText('Đã lưu');
});

test('TC014 - Hủy theo dõi truyện bằng Button "Đã Lưu" ở trang chi tiết truyện', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', TOKEN);
  });
  await page.goto(BASE_URL);
  await page.locator('.tracking-tight').first().click();
  const saveBtn = page.getByRole('button', { name: 'Đã lưu' });
  await saveBtn.click();
  await expect(saveBtn).toHaveText('Lưu');
});

test('TC015 - Xem chi tiết bộ truyện được chọn', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.locator('.tracking-tight').first().click();
  await page.waitForURL(/\/novels.+/);
  await expect(page.getByRole('heading').first()).toBeVisible();
  await expect(page).toHaveURL(/\/novels\/\d+/);
});

test('TC016 - Xem số lượng theo dõi bộ truyện có tăng khi click button "Lưu"', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', TOKEN);
  });
  await page.goto(BASE_URL);
  await page.locator('.tracking-tight').first().click();
  const before = await page.locator('.ml-1').first().innerText();
  const saveBtn = page.getByRole('button', { name: 'Lưu' });
  await saveBtn.click();
  await page.reload();
  const after = await page.locator('.ml-1').first().innerText();
  expect(Number(after)).toBeGreaterThan(Number(before));
});

test('TC017 - Xem số lượng theo dõi bộ truyện có giảm khi click button "Đã lưu"', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('token', TOKEN);
  });
  await page.goto(BASE_URL);
  await page.locator('.tracking-tight').first().click();
  const before = await page.locator('.ml-1').first().innerText();
  const saveBtn = page.getByRole('button', { name: 'Đã lưu' });
  await saveBtn.click();
  await page.reload();
  const after = await page.locator('.ml-1').first().innerText();
  expect(Number(after)).toBeLessThan(Number(before));
});

test('TC018 - Thoát ra khỏi giao diện chi tiết truyện khi click button "Quay về trang chủ"', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.locator('.tracking-tight').first().click();
  await page.getByRole('link', { name: 'Quay về trang chủ' }).click();
  await expect(page).toHaveURL(BASE_URL);
});

test('TC019 - Hiển thị list chương khi nhấn vào tab "Chương"', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.locator('.tracking-tight').first().click();
  await page.getByRole('tab', { name: 'Chương' }).click();
  await expect(page.getByText('Danh sách chương')).toBeVisible();
});

test('TC020 - Truy cập chương truyện khi bấm vào link "Chương"', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.locator('.tracking-tight').first().click();
  await page.getByRole('tab', { name: 'Chương' }).click();
  await page.locator('a[href*="/chapter"]').first().click();
  await expect(page.locator('div')).toContainText('Nội dung');
  await expect(page.getByRole('link', { name: /Chapter (trước|kế)/i })).toBeVisible();
});

test('TC021 - Chuyển chapter trước khi click vào link "Chapter trước" để chuyển tới chương phía trước', async ({ page }) => {
  await page.goto('https://do-an-nodejs.vercel.app/novels/5/chapters/118');
  const previousBtn = page.getByRole('link', { name: 'Chapter trước' }).first();
  await expect(previousBtn).toBeVisible();
  const prevHref = await previousBtn.getAttribute('href');
  await previousBtn.click();
  await expect(page).toHaveURL(new RegExp(`${prevHref}$`));
});

test('TC022 - Chuyển chapter sau khi click vào link "Chapter kế" để chuyển tới chương phía sau tiếp', async ({ page }) => {
  await page.goto('https://do-an-nodejs.vercel.app/novels/5/chapters/118');
  const nextBtn = page.getByRole('link', { name: 'Chapter kế' }).first();
  await expect(nextBtn).toBeVisible();
  const nextHref = await nextBtn.getAttribute('href');
  await nextBtn.click();
  await expect(page).toHaveURL(new RegExp(`${nextHref}$`));
});
