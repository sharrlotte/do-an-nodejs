import { test, expect } from '@playwright/test';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlkIjoxLCJ1c2VybmFtZSI6IlNoYXJsb3R0ZSIsImFib3V0IjoiIiwidXBkYXRlZEF0IjpudWxsLCJjcmVhdGVkQXQiOiIyMDI1LTA0LTAzVDA5OjE2OjQ4LjE2NFoiLCJhdmF0YXIiOiJodHRwczovL2dpdGh1Yi5jb20vc2hhcnJsb3R0ZSIsImF1dGhvcml0aWVzIjpbXSwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE3NDQwMTMxOTAsImV4cCI6MTc0NDI3MjM5MH0.6w9htT_Ex-QMPj5D9SBK6qiMYsMA9kV7EBIBo1A9HiY';

test.describe('History Page Tests', () => {
  test('should show login message when not logged in', async ({ page }) => {
    await page.goto('/history');

    // Kiểm tra xem có hiển thị thông báo yêu cầu đăng nhập không
    await expect(page.getByText('Dăng nhập')).toBeVisible();
  });

  test('should not show login message when logged in', async ({ page }) => {
    // Set token vào localStorage để giả lập đăng nhập

    await page.goto('/');

    await page.evaluate((token) => {
      localStorage.setItem('token', token);
    }, TOKEN);

    await page.goto('/history');

    // Verify login message is not visible
    await expect(page.getByText('Dăng nhập')).not.toBeVisible();
  });
});
