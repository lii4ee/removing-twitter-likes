import { test } from '@playwright/test';
import * as fs from 'fs';

test.only('save cookies after login', async ({ browser }) => {
  console.log('Starting the login process');

  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('https://x.com/login');
  
  console.log('Please login manually in the browser window');
  
  try {
    // Wait for a maximum of 90 seconds for this element to appear
    await page.locator('[data-testid="SideNav_NewTweet_Button"], [data-testid="AppTabBar_Tweet_Button"]').waitFor({ timeout: 90000 });
    console.log('Login detected!');
    
    // Save cookies
    const cookies = await context.cookies();
    fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));
    console.log('Cookies saved to cookies.json');
  } catch (error) {
    console.error('Login timeout or element not found:', error.message);
  }
});

test('use saved cookies', async ({ browser }) => {
  if (!fs.existsSync('cookies.json')) {
    console.log('No cookies file found. Run the login test first.');
    test.skip();
    return;
  }

  const context = await browser.newContext();
  
  // Load cookies
  const cookiesFromFile = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));
  await context.addCookies(cookiesFromFile);
  
  // Navigate to profile page to verify login worked
  const page = await context.newPage();
  await page.goto('https://x.com/home');
  
  // Verify we're logged in
  if (await page.locator('[data-testid="AppTabBar_Tweet_Button"], [data-testid="SideNav_NewTweet_Button"]').count() > 0) {
    console.log('Successfully loaded with cookies');
    
    // Add your unlike logic here
    await page.goto('https://x.com/AN5EL0');
    const liked = await page.locator('[data-testid="unlike"]');
    if (await liked.count() > 0) {
      await liked.click();
    }
  } else {
    console.log('Cookie-based login failed');
  }
});

test('unlike tweet', async ({ browser }) => {

  const context = await browser.newContext();
  const cookiesFromFile = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));
  await context.addCookies(cookiesFromFile);
  
  const page = await context.newPage();
  await page.goto('https://x.com/AN5EL0/likes');
  
  // Wait for the page to load
  await page.waitForSelector('[data-testid="primaryColumn"]');
  
  // Keep track of how many tweets we've unliked
  let unlikedCount = 0;
  
  // Run until we've unliked a certain number or no more are found
  const maxUnlikes = 100; // Adjust as needed
  
  console.log('Starting to unlike tweets...');

  while (unlikedCount < maxUnlikes) {
    // Find all unlike buttons
    const unlikeButtons = await page.locator('[data-testid="unlike"]').all();

    
    // Unlike each tweet
    for (const button of unlikeButtons) {
      try {
        // Make sure the button is visible before clicking
        await button.scrollIntoViewIfNeeded();
        await button.click();
        unlikedCount++;
        console.log(`Unliked tweet #${unlikedCount}`);
        
        // Small delay to avoid rate limiting
        await page.waitForTimeout(1000);
      } catch (error) {
        console.log('Error unliking a tweet:', error.message);
      }
    }
    
    // Scroll down to load more tweets
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(2000); // Wait for new tweets to load
  }
  
  console.log(`Unliking process completed. Total unliked: ${unlikedCount}`);
  
});


test('undo retweet', async ({ browser }) => {
  
  const context = await browser.newContext();
  const cookiesFromFile = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));
  await context.addCookies(cookiesFromFile);
  
  const page = await context.newPage();
  await page.goto('https://x.com/AN5EL0');
  
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