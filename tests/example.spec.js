import { test } from '@playwright/test';
import * as fs from 'fs';

//Use this part of the code to login to your account and save the cookies
//When you login correctly you will be able to see a cookies.json file in your project folder
//DO NOT SHARE YOU COOKIES
test.only('save cookies after login', async ({ browser }) => {
  console.log('Starting the login process');
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://x.com/login');
  console.log('Please login manually in the browser window');
  try {
    await page.locator('[data-testid="SideNav_NewTweet_Button"], [data-testid="AppTabBar_Tweet_Button"]').waitFor({ timeout: 90000 });
    console.log('Login detected!');
    const cookies = await context.cookies();
    fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));
    console.log('Cookies saved to cookies.json');
  } catch (error) {
    console.error('Login timeout or element not found:', error.message);
  }
});

//This is a test to check whether the cookies work correctly 
//Skip this if you don't encounter error with the next test
test('use saved cookies', async ({ browser }) => {
  if (!fs.existsSync('cookies.json')) {
    console.log('No cookies file found. Run the login test first.');
    test.skip();
    return;
  }
  const context = await browser.newContext();
  const cookiesFromFile = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));
  await context.addCookies(cookiesFromFile);
  const page = await context.newPage();
  await page.goto('https://x.com/home');
  if (await page.locator('[data-testid="AppTabBar_Tweet_Button"], [data-testid="SideNav_NewTweet_Button"]').count() > 0) {
    console.log('Successfully loaded with cookies');
    await page.goto('https://x.com/AN5EL0');
  } else {
    console.log('Cookie-based login failed');
  }
});

//This is the main test to unlike your liked tweets
test('unlike tweet', async ({ browser }) => {
  const context = await browser.newContext();
  const cookiesFromFile = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));
  await context.addCookies(cookiesFromFile);
  const page = await context.newPage();

  //copy paste your twitter profile link instead of mine
  //or just enter your twitter profile link at "AN5EL0" in the next line
  await page.goto('https://x.com/AN5EL0/likes');
  await page.waitForSelector('[data-testid="primaryColumn"]');
  let unlikedCount = 0;
  const maxUnlikes = 100;
  console.log('Starting to unlike tweets...');
  while (unlikedCount < maxUnlikes) {
    const unlikeButtons = await page.locator('[data-testid="unlike"]').all();
    for (const button of unlikeButtons) {
      try {
        await button.scrollIntoViewIfNeeded();
        await button.click();
        unlikedCount++;
        console.log(`Unliked tweet #${unlikedCount}`);
        await page.waitForTimeout(1000);
      } catch (error) {
        console.log('Error unliking a tweet:', error.message);
      }
    }
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(2000);
  }
  console.log(`Unliking process completed. Total unliked: ${unlikedCount}`);
});

//This is the main test to undo your retweets
test('undo retweet', async ({ browser }) => {
  const context = await browser.newContext();
  const cookiesFromFile = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));
  await context.addCookies(cookiesFromFile);
  const page = await context.newPage();
  await page.goto('https://x.com/AN5EL0'); //copy paste your twitter profile link instead of mine
  await page.waitForSelector('[data-testid="primaryColumn"]');
  let undoneRetweet = 0;
  const maxUndoneRetweet = 100; 
  console.log('Starting to undoing retweets.');
  while (undoneRetweet < maxUndoneRetweet) {
    const unlikeButtons = await page.locator('[data-testid="unretweet"]').all();
    for (const button of unlikeButtons) {
      try {
        await button.scrollIntoViewIfNeeded();
        await button.click();
        await page.locator('[data-testid="unretweetConfirm"]').click();
        undoneRetweet++;
        console.log(`Unliked tweet #${undoneRetweet}`);
        await page.waitForTimeout(1000);
      } catch (error) {
        console.log('Error unliking a tweet:', error.message);
      }
    }
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(2000); 
  }
  console.log(`Unliking process completed. Total unliked: ${undoneRetweet}`);
});