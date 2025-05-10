import { test, expect } from '@playwright/test';

test('login with captcha manually', async ({ page }) => {
  //await page.goto('https://www.londondrugs.com/auth/login');
  await page.goto('https://london-drugs-uat-origin.kibology.us/');
  await page.pause();
  
  // Fill login fields
  await page.locator("aside[class='hidden flex-row items-center justify-between md:flex md:gap-2 lg:gap-x-12'] aside[class='relative px-2'] div svg path").click()
  await page.locator("//a[normalize-space()='Sign in']").click()
  await page.fill("[name*='email']", 'tomjerry@yopmail.com');
  await page.fill("[name*='password']", 'Test@123');
  
  // Pause here to manually solve captcha
  await page.pause();

  // Then click login (after solving)
  await page.click('#loginButton');
});
