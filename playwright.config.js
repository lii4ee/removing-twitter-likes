import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120000, // 2 minutes
  use: {
    browserName: 'chromium',
    headless: false,
    deviceScaleFactor: undefined,
    viewport: null, //{ width: 1920, height: 945 }, // Set the viewport size to full HD
    launchOptions: 
    {
      args: ['--start-maximized'], // Launch the browser in full screen
    },
    navigationTimeout: 30000,
    actionTimeout: 15000,
  },
});