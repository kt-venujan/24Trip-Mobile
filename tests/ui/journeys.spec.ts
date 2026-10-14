import { expect, test } from '@playwright/test';

test('search, select seats, confirm and cancel a booking', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Find my ride', exact: true }).click();
  await expect(page.getByText('2 rides available')).toBeVisible();
  await page.getByRole('button', { name: 'Lowest fare', exact: true }).click();
  await page.getByRole('button', { name: /Colombo Fort to Kandy City, LKR 1,800/ }).click();
  await page.getByRole('button', { name: 'Choose your seats', exact: true }).click();
  await expect(page.getByRole('checkbox', { name: 'Seat 2, unavailable', exact: true })).toBeDisabled();
  await page.getByRole('checkbox', { name: 'Seat 1', exact: true }).click();
  await page.getByRole('button', { name: 'Confirm demo booking · LKR 1,800' }).click();
  await expect(page.getByText('Demo booking confirmed', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Cancel booking', exact: true }).click();
  await page.getByRole('button', { name: 'Yes, cancel demo booking', exact: true }).click();
  await expect(page.getByText('Cancelled', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'View my bookings', exact: true }).click();
  await page.getByRole('button', { name: 'Cancelled', exact: true }).click();
  await expect(page.getByRole('button', { name: 'View booking', exact: true })).toHaveCount(2);
});

test('empty search and invalid date have recoverable states', async ({ page }) => {
  await page.goto('/search', { waitUntil: 'networkidle' });
  await page.getByLabel('DESTINATION', { exact: true }).fill('Nowhere');
  await page.getByRole('button', { name: 'Find my ride', exact: true }).click();
  await expect(page.getByText('No rides along this route yet')).toBeVisible();
  await page.getByRole('button', { name: 'Show all rides', exact: true }).click();
  await expect(page.getByLabel('DESTINATION', { exact: true })).toHaveValue('');
  await page.getByLabel('TRAVEL DATE', { exact: false }).fill('2026-02-30');
  await page.getByRole('button', { name: 'Find my ride', exact: true }).click();
  await expect(page.getByText('Choose today or a future date in YYYY-MM-DD format.')).toBeVisible();
});

test('profile editing updates shared state and auth validates inputs', async ({ page }) => {
  await page.goto('/account/edit', { waitUntil: 'networkidle' });
  await page.getByLabel('Full name', { exact: true }).fill('Amaya Silva');
  await page.getByRole('button', { name: 'Save profile', exact: true }).click();
  await expect(page.getByText(/Your demo profile has been updated/)).toBeVisible();
  await page.getByRole('button', { name: 'Go back', exact: true }).click();
  await expect(page.getByText('Ayubowan, Amaya!')).toBeVisible();
  await page.goto('/register', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Create demo profile', exact: true }).click();
  await expect(page.getByText('Please enter your full name.')).toBeVisible();
  await page.getByLabel('Full name', { exact: true }).fill('Demo Traveller');
  await page.getByLabel('Email address', { exact: true }).fill('traveller@example.com');
  await page.getByLabel('Password', { exact: true }).fill('samplepass');
  await page.getByLabel('Confirm password', { exact: true }).fill('different');
  await page.getByRole('button', { name: 'Create demo profile', exact: true }).click();
  await expect(page.getByText('Your passwords do not match.')).toBeVisible();
  await page.getByLabel('Confirm password', { exact: true }).fill('samplepass');
  await page.getByRole('button', { name: 'Create demo profile', exact: true }).click();
  await expect(page.getByText('Demo session active')).toBeVisible();
});

test('driver publishes, edits and completes a trip', async ({ page }) => {
  await page.goto('/driver', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Publish a trip', exact: true }).click();
  await page.getByLabel('Destination', { exact: true }).fill('Matara');
  await page.getByLabel('Fare per seat (LKR)', { exact: true }).fill('1900');
  await page.getByRole('button', { name: 'Publish demo trip', exact: true }).click();
  await expect(page.getByText('Matara', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Edit trip', exact: true }).first().click();
  await page.getByLabel('Fare per seat (LKR)', { exact: true }).fill('2000');
  await page.getByRole('button', { name: 'Save demo trip changes', exact: true }).click();
  await expect(page.getByText(/LKR 2,000 per seat/)).toBeVisible();
  await page.getByRole('button', { name: 'Mark demo trip completed', exact: true }).first().click();
  await expect(page.getByText('Matara', { exact: true })).toHaveCount(0);
});

test('all screens render without JS errors or horizontal overflow at 320px', async ({ page }) => {
  test.setTimeout(120000);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width: 320, height: 740 });
  for (const path of ['/', '/search', '/bookings', '/profile', '/welcome', '/login', '/register', '/forgot-password', '/trips/trip-1', '/bookings/select?tripId=trip-1', '/bookings/24T-1042', '/trips/offer?tripId=trip-1', '/account/edit', '/account/settings', '/account/help', '/account/requests', '/driver', '/driver/onboarding', '/driver/vehicles', '/driver/vehicle-form', '/driver/trips', '/driver/trip-form', '/driver/requests', '/driver/history', '/driver/earnings']) {
    await page.goto(path, { waitUntil: 'networkidle' });
    await expect(page.getByText('24 TRIP DEMO · No real bookings or payments', { exact: true })).toBeAttached();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow, `Horizontal overflow at ${path}`).toBe(false);
  }
  expect(errors).toEqual([]);
});
