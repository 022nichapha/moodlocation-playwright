import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  reporter: 'html',

  use: {
    baseURL: 'https://moodlocation.vercel.app/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions: {
      slowMo: 700,
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
