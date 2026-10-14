import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/ui',
  timeout: 45000,
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  outputDir: 'dist/test-results',
  use: { baseURL: 'http://localhost:8083', channel: 'msedge', headless: true, viewport: { width: 390, height: 844 }, screenshot: 'only-on-failure', trace: 'retain-on-failure' },
});
