const { chromium } = require('C:/Users/natap/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const outDir = path.resolve('audit/v2/hero-mobile');
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce', deviceScaleFactor: 1, locale: 'pt-BR' });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });

  const dots = page.locator('.hero__dots button');
  const slides = page.locator('.hero__slide');
  const results = { dotCount: await dots.count(), slideCount: await slides.count(), slides: [] };
  for (let index = 0; index < await dots.count(); index += 1) {
    await page.evaluate(() => scrollTo(0, 0));
    await dots.nth(index).click();
    await page.waitForTimeout(1400);
    const active = await slides.evaluateAll((items) => items.findIndex((item) => item.classList.contains('is-active')));
    const source = await slides.nth(active).getAttribute('src');
    results.slides.push({ requested: index, active, source });
    await page.screenshot({ path: path.join(outDir, `slide-${index + 1}.jpg`), type: 'jpeg', quality: 78 });
  }

  await dots.nth(0).click();
  await page.locator('.hero__carousel').dispatchEvent('touchstart', { touches: [{ identifier: 1, clientX: 320, clientY: 400 }] });
  await page.locator('.hero__carousel').dispatchEvent('touchend', { changedTouches: [{ identifier: 1, clientX: 80, clientY: 400 }] });
  await page.waitForTimeout(100);
  results.swipeActive = await slides.evaluateAll((items) => items.findIndex((item) => item.classList.contains('is-active')));

  await context.close();
  const autoplayContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const autoplayPage = await autoplayContext.newPage();
  await autoplayPage.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  const autoplayBefore = await autoplayPage.locator('.hero__slide').evaluateAll((items) => items.findIndex((item) => item.classList.contains('is-active')));
  await autoplayPage.waitForTimeout(7000);
  const autoplayAfter = await autoplayPage.locator('.hero__slide').evaluateAll((items) => items.findIndex((item) => item.classList.contains('is-active')));
  results.autoplayAdvanced = autoplayAfter !== autoplayBefore;
  await autoplayContext.close();
  const reducedContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  const reducedBefore = await reducedPage.locator('.hero__slide').evaluateAll((items) => items.findIndex((item) => item.classList.contains('is-active')));
  await reducedPage.waitForTimeout(7000);
  const reducedAfter = await reducedPage.locator('.hero__slide').evaluateAll((items) => items.findIndex((item) => item.classList.contains('is-active')));
  results.reducedMotionStayedStill = reducedBefore === reducedAfter;
  await reducedContext.close();
  await browser.close();
  fs.writeFileSync(path.resolve('audit/v2/carousel-report.json'), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
})().catch((error) => { console.error(error); process.exit(1); });
