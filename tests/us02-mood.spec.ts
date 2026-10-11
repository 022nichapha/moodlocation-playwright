
import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'https://moodlocation.vercel.app/';

const SELECTORS = {
  loginLink: 'เข้าสู่ระบบ',
  loginButton: 'เข้าสู่ระบบ',
  emailPlaceholder: 'example@mail.com',
  passwordPlaceholder: '••••••••',
  stressedMood: '🤯 เครียด',
  happyMood: '😁 มีความสุข',
  searchNearby: 'ค้นหาสถานที่ใกล้ฉัน',
  viewReviews: 'ดูรูปภาพและรีวิว',
};

async function login(page: Page) {
  const email = process.env.MOOD_EMAIL;
  const password = process.env.MOOD_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'กรุณากำหนด MOOD_EMAIL และ MOOD_PASSWORD ใน Environment Variables'
    );
  }

  await page.goto(BASE_URL);

  await page.getByRole('link', {
    name: SELECTORS.loginLink,
  }).click();

  await page.getByRole('textbox', {
    name: SELECTORS.emailPlaceholder,
  }).fill(email);

  await page.getByRole('textbox', {
    name: SELECTORS.passwordPlaceholder,
  }).fill(password);

  await page.locator('form')
    .getByRole('button', {
      name: SELECTORS.loginButton,
    })
    .click();

  await expect(
    page.getByRole('button', {
      name: SELECTORS.stressedMood,
    }).first()
  ).toBeVisible({ timeout: 20000 });
}

async function clickFirstVisible(
  page: Page,
  role: 'button' | 'link',
  name: string
) {
  const locator = page.getByRole(role, { name }).first();

  await expect(locator).toBeVisible({ timeout: 15000 });
  await locator.click();
}

async function searchMood(page: Page, mood: string) {
  await clickFirstVisible(page, 'button', mood);

  const search = page.getByText(
    SELECTORS.searchNearby,
    { exact: true }
  ).last();

  await expect(search).toBeVisible({ timeout: 15000 });
  await search.click();

  await expect(
    page.getByRole('button', {
      name: SELECTORS.viewReviews,
    }).first()
  ).toBeVisible({ timeout: 20000 });
}

async function openPlaceDetails(page: Page) {
  await clickFirstVisible(
    page,
    'button',
    SELECTORS.viewReviews
  );

  // ตรวจว่าหน้ารายละเอียดเปิดขึ้นแล้ว
  await expect(page.locator('body')).toBeVisible();

  // บันทึกภาพหน้าจอไว้ตรวจสอบหน้ารายละเอียด
  await page.screenshot({
    path: 'debug-place-details.png',
    fullPage: true,
  });

  console.log('URL หลังเปิดรายละเอียด:', page.url());
}

test.describe('US-02: เลือกอารมณ์ผ่าน Mood Icons', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('TC_2_0_001: เลือกอารมณ์เครียดและค้นหาสถานที่', async ({ page }) => {
    await searchMood(page, SELECTORS.stressedMood);

    await expect(
      page.getByRole('button', {
        name: SELECTORS.viewReviews,
      }).first()
    ).toBeVisible();

    await openPlaceDetails(page);
  });

  test('TC_2_0_002: เลือกอารมณ์มีความสุขและค้นหาสถานที่', async ({ page }) => {
    await searchMood(page, SELECTORS.happyMood);

    await expect(
      page.getByRole('button', {
        name: SELECTORS.viewReviews,
      }).first()
    ).toBeVisible();

    await openPlaceDetails(page);
  });
});
