import { test, expect } from '@playwright/test';

const TOKEN_NORMAL = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlkIjoxLCJ1c2VybmFtZSI6IlNoYXJsb3R0ZSIsImFib3V0IjoiIiwidXBkYXRlZEF0IjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA0LTAzVDA5OjE2OjQ4LjE2NFoiLCJhdmF0YXIiOiJodHRwczovL2dpdGh1Yi5jb20vc2hhcnJsb3R0ZSIsImF1dGhvcml0aWVzIjpbXSwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NDQwMTMxOTAsImV4cCI6MTc0NDI3MjM5MH0.6w9htT_Ex-QMPj5D9SBK6qiMYsMA9kV7EBIBo1A9HiY';

const TOKEN_ADMIN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlkIjoxLCJ1c2VybmFtZSI6IlNoYXJsb3R0ZSIsImF2YXRhciI6Imh0dHBzOi8vZ2l0aHViLmNvbS9zaGFycmxvdHRlIiwiYXV0aG9yaXRpZXMiOltdLCJyb2xlcyI6WyJBRE1JTiJdLCJpYXQiOjE3NDQwMTMzNTIsImV4cCI6MTc0NDI3MjU1Mn0.l6SGQcxH8ldaTDiZXOk0Fvmmz04x0-ELpnOFO1n8A8w';

test.describe('Admin Page Tests', () => {
  test('should show login message when not login', async ({ page }) => {
    await page.goto('/admin/category');

    await expect(page.getByText('Đăng nhập để tếp tục')).toBeVisible();
  });

  test('should show access denied message when accessing with normal user token', async ({ page }) => {
    await page.goto('/');

    await page.evaluate((token) => {
      localStorage.setItem('token', token);
    }, TOKEN_NORMAL);

    await page.goto('/admin/category');

    await expect(page.getByText('Không có quyền truy cập')).toBeVisible();
  });

  test('should allow access with admin token', async ({ page }) => {
    await page.goto('/');

    await page.evaluate((token) => {
      localStorage.setItem('token', token);
    }, TOKEN_ADMIN);

    await page.goto('/admin/category');

    await expect(page).toHaveURL('/admin/category');
    await expect(page.getByText('Không có quyền truy cập')).not.toBeVisible();
  });

  test('should able to add category', async ({ page }) => {
    await page.goto('/');

    await page.evaluate((token) => {
      localStorage.setItem('token', token);
    }, TOKEN_ADMIN);

    await page.goto('/admin/category');

    await page
      .locator('.lucide-trash2')
      .last()
      .evaluate((el) => el.parentElement?.click());

    //find button with name Thêm thể loại
    await page.locator('.lucide-plus').evaluate((el) => el.parentElement?.click());

    await page.getByPlaceholder('Nhập tên thể loại').fill('Test');

    await page.getByRole('button', { name: 'Thêm' }).click();

    await expect(page.getByText('Test')).toBeVisible();
  });

  test('should be able to delete category', async ({ page }) => {
    await page.goto('/');

    await page.evaluate((token) => {
      localStorage.setItem('token', token);
    }, TOKEN_ADMIN);

    await page.goto('/admin/category');

    await page.locator('.lucide-trash2').last();
  });
});
