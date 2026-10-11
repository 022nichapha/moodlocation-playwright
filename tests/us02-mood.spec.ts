
import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'https://moodlocation.vercel.app/';

async function login(page: Page) {
  const email = process.env.MOOD_EMAIL;
  const password = process.env.MOOD_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'กรุณากำหนด MOOD_EMAIL และ MOOD_PASSWORD ก่อนรันเทส'
    );
  }

  await page.goto(BASE_URL);

  await page.getByRole('link', {
    name: 'เข้าสู่ระบบ',
  }).click();

  await page.getByRole('textbox', {
    name: 'example@mail.com',
  }).fill(email);

  await page.getByRole('textbox', {
    name: '••••••••',
  }).fill(password);

  await page.locator('form')
    .getByRole('button', { name: 'เข้าสู่ระบบ' })
    .click();

  // ยืนยันว่าเข้าสู่หน้าที่มีตัวเลือกอารมณ์ได้
  await expect(
    page.getByRole('button', { name: '🤯 เครียด' })
  ).toBeVisible({ timeout: 15000 });
}

async function searchMood(page: Page, mood: string) {
  await page.getByRole('button', { name: mood }).click();

  const search = page.getByText(
    'ค้นหาสถานที่ใกล้ฉัน',
    { exact: true }
  ).last();

  await expect(search).toBeVisible();
  await search.click();

  await expect(
    page.getByRole('button', { name: 'ดูรูปภาพและรีวิว' }).first()
  ).toBeVisible({ timeout: 15000 });
}

async function openPlaceDetails(page: Page) {
  await page.getByRole('button', {
    name: 'ดูรูปภาพและรีวิว',
  }).nth(1).click();

  await expect(page.locator('body')).toBeVisible();

  // ใช้ขั้นตอนกลับตามที่บันทึกจากเว็บไซต์จริง
  await page.getByRole('button').nth(2).click();

  await page.getByRole('button', {
    name: 'กลับไปเลือกประเภทใหม่',
  }).click();

  await page.getByRole('button', {
    name: 'กลับไปเลือกอารมณ์ใหม่',
  }).click();
}

test.describe('US-02: เลือกอารมณ์ผ่าน Mood Icons', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('TC_2_0_001: เลือกอารมณ์เครียดและค้นหาสถานที่', async ({ page }) => {
    await searchMood(page, '🤯 เครียด');

    await expect(
      page.getByRole('button', {
        name: 'ดูรูปภาพและรีวิว',
      }).first()
    ).toBeVisible();

    await openPlaceDetails(page);
  });

  test('TC_2_0_002: เปลี่ยนอารมณ์เป็นมีความสุขและค้นหาสถานที่', async ({ page }) => {
    // เลือกเครียดก่อน แล้วเปลี่ยนกลับมาเลือกอารมณ์ใหม่
    await searchMood(page, '🤯 เครียด');

    await page.getByRole('button', {
      name: 'กลับไปเลือกประเภทใหม่',
    }).click();

    await page.getByRole('button', {
      name: 'กลับไปเลือกอารมณ์ใหม่',
    }).click();

    await searchMood(page, '😁 มีความสุข');

    await expect(
      page.getByRole('button', {
        name: 'ดูรูปภาพและรีวิว',
      }).first()
    ).toBeVisible();

    await openPlaceDetails(page);
  });
});
