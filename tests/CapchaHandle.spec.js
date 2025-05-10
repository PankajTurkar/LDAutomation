/**
 * You’re using puppeteer-extra plugins (like stealth) with Playwright — which is not officially supported.
 * 
 * 
 */




const { chromium } = require('playwright-extra');
const stealth = require('playwright-extra-plugin-stealth')();

chromium.use(stealth);

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.londondrugs.com/auth/login');

  // Fill in login details
  await page.fill("[name*='email']", 'tomjerry@yopmail.com');
  await page.fill("[name*='password']", 'Test@123');

  // If CAPTCHA is not shown due to stealth: great! Proceed.
  await page.click('#loginButton');

  // Wait and check login status
  await page.waitForTimeout(5000);
  await browser.close();
})();
