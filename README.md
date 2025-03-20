# 🧹 Twitter Regret Eraser 3000 🧹

*Because your drunk (water obviously) Twitter likes from 2018 shouldn't haunt you forever*

## 🚨 THE PROBLEM 🚨

So you've been on Twitter/X (whatevs) for too long and:
1. You've retweeted so many political bot fights that the algorithm thinks you're running a call center for angry opinions
2. Your "Liked" section is basically a documentary of your descent into madness

## 💊 THE SOLUTION 💊

This magical script will help you unlike all those tweets and undo all those retweets so you can pretend you were never part of the problem!

## 🤷‍♂️ DISCLAIMER: I HAVE NO IDEA WHAT I'M DOING 🤷‍♂️

Full disclosure: I cobbled this together with prayer, and spite. It works on my machine, but I genuinely have no clue why. If it breaks, we're both equally qualified to fix it (meaning not at all).

Half of this code is just me typing things until the red squiggly lines went away. The other half is from tutorials I didn't fully read.

## 🛠️ Prerequisites 🛠️

1. **Node.js** - Because you need one more JavaScript runtime in your life
   ```
   # Windows users
   Just download the installer and click "Next" 37 times

   # Mac users
   brew install node
   
   # Linux users
   sudo apt install nodejs
   # (Then spend 3 hours fixing dependency issues)
   ```

2. **Playwright** - It's like Puppeteer but with more drama
   ```
   npm init -y
   npm install @playwright/test
   npx playwright install chromium
   # At this point I was just following commands without understanding them
   ```

3. **A Twitter/X account** - Preferably one where you've made questionable life choices

4. **Shame** - For liking all those tweets about "Why MY F1 Driver (Max Verstrappen) is better than YOUR F1 Driver(idc who it is)"

5. **Blind faith** - That this will somehow work despite my limited knowledge

## 🚀 Setup 🚀

1. Create a folder called "i-regret-everything"
   ```
   mkdir i-regret-everything
   cd i-regret-everything
   ```

2. Copy the test file into `tests/twitter-cleaner.spec.js` or whatever you to name it :)
   ```
   mkdir tests
   # Paste the code from paste.txt into tests/twitter-cleaner.spec.js
   # Don't ask me what half these functions do, I just know they work
   ```

3. Create `playwright.config.js` in the root folder

4. **IMPORTANT:** Change the Twitter handle from mine to yours!
   ```javascript
   // Find all instances of 'AN5EL0' and replace with your handle
   // Don't forget this part or you'll be cleaning MY Twitter instead of yours
   // (Yes, I've done this mistake myself. Multiple times.)
   // It's a joke
   // :)
   ```

## 🎭 Usage 🎭

1. **Login and save cookies:**
   ```
   npx playwright test
   ```
   * A browser will open
   * Login manually (we're not stealing your credentials, pinky promise)
   * Wait for the script to detect your login
   * The browser will close and save your cookies to `cookies.json`
   * DO NOT SHARE THIS FILE (unless you want internet strangers tweeting about cryptocurrency from your account)
   * If it doesn't work, I'm as confused as you are

2. **Optional: Test if cookies work:**
   ```
   You might see that only one test is being running
   ```
   So Change the 
   ```
   test('',)
   ```
   to 
   ```
   test.only('', )
   ```
   You have to do this for the next time you run it as well
   //After running this one time change this into test.only('...') from test('...')

3. **Unlike all those PM of India tweets:**
   ```
   npx playwright test
   ```
   // you have too do this again after changing the test('', ) to test.only('', )

   * Watch in awe as the script methodically destroys evidence of your political obsessions
   * I wrote this part at 2am and I'm not entirely sure how it functions

4. **Undo retweets of bot fights:**
   ```
   npx playwright test
   ```
   again for retweets, you can skip if you want to or add more if you want to,
   I am not doing all that for now.

   * Goodbye, evidence of that time you retweeted 47 tweets in a row about agricultural policy

## ⚠️ Warnings ⚠️
1. Twitter/X might think you're a bot and temporarily restrict your account. If so, congratulations! You've come full circle!
2. This script might make your timeline look suspiciously empty, and people might wonder if you've been abducted by aliens or finally got a life.
3. If this breaks your account somehow, remember: I warned you I didn't know what I was doing.
4. If anything crashes, try turning it off and on again. That's literally the extent of my debugging knowledge.

## 🙏 Acknowledgements 🙏

- Thanks to Twitter bots for providing endless entertainment in comment sections
- Special thanks to that one tweet about Indian politics that made you go "YEAH!" and hit retweet at 3 AM
- Stack Overflow users whose code I borrowed without fully understanding
- Caffeine, which powered the creation of this code through several nights of "why isn't this working?"
- Yes This simple code took several nights because I did this using my selenium knowledge not my playwright knowledge

## 📃 License 📃

This tool is licensed under the "Oh God What Have I Tweeted" Public License.
---
*"Twitter cleanse today, new hot takes tomorrow"* - Ancient Twitter Proverb

# npx playwright test --grep "save cookies after login"
I should used something like this to make this eaiser but I don't know what this does
:)
