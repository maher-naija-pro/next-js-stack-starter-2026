import { expect, test } from '@playwright/test';

test('home page loads and the counter works', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: /stack that ships/i })).toBeVisible();

  await expect(page.getByTestId('count')).toHaveText('0');
  await page.getByLabel('Increment').click();
  await expect(page.getByTestId('count')).toHaveText('1');
});

test('nuqs tab filter updates the URL', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'settings' }).click();
  await expect(page).toHaveURL(/tab=settings/);
});
