const { chromium } = require('C:/Users/natap/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const target = process.env.PAGES_URL || 'http://127.0.0.1:4173/lp-bonistar/';
  const outDir = path.resolve(process.env.PAGES_AUDIT_DIR || 'audit/pages-preview');
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const report = {};

  for (const profile of [
    { name: 'desktop-1440x900', viewport: { width: 1440, height: 900 }, isMobile: false },
    { name: 'tablet-768x1024', viewport: { width: 768, height: 1024 }, isMobile: false },
    { name: 'mobile-390x844', viewport: { width: 390, height: 844 }, isMobile: true },
  ]) {
    const context = await browser.newContext({ viewport: profile.viewport, isMobile: profile.isMobile, hasTouch: profile.isMobile, locale: 'pt-BR' });
    const page = await context.newPage();
    const errors = [];
    const badResponses = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
    page.on('pageerror', (error) => errors.push(`page: ${error.message}`));
    page.on('requestfailed', (request) => errors.push(`request: ${request.url()} — ${request.failure()?.errorText}`));
    page.on('response', (response) => { if (response.status() >= 400) badResponses.push({ status: response.status(), url: response.url() }); });

    const response = await page.goto(target, { waitUntil: 'networkidle', timeout: 60000 });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += Math.max(500, innerHeight * 0.75)) {
        scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      for (const track of document.querySelectorAll('.live__track,.gallery__grid,.quotes')) {
        track.scrollLeft = track.scrollWidth;
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
      scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    if (profile.isMobile) {
      await page.locator('.menu-toggle').click();
      await page.locator('#main-nav a[href="#experiencias"]').click();
      await page.waitForTimeout(250);
    }

    const images = await page.locator('img').evaluateAll((items) => items.map((image) => ({ src: image.currentSrc, loaded: image.complete && image.naturalWidth > 0 })));
    const localResources = await page.evaluate(() => performance.getEntriesByType('resource').map((entry) => entry.name).filter((url) => new URL(url).origin === location.origin));
    await page.screenshot({ path: path.join(outDir, `${profile.name}.png`), fullPage: true });
    report[profile.name] = {
      status: response.status(),
      url: page.url(),
      dimensions: await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth })),
      imagesLoaded: images.filter((image) => image.loaded).length,
      imagesTotal: images.length,
      brokenImages: images.filter((image) => !image.loaded),
      assetsOutsideBase: localResources.filter((url) => !new URL(url).pathname.startsWith('/lp-bonistar/')),
      ctaCount: await page.locator('a[href*="viajar.embonitoms.com.br"]').count(),
      heroSlides: await page.locator('.hero__slide').count(),
      experienceCards: await page.locator('.live-card').count(),
      badResponses,
      errors,
    };
    await context.close();
  }

  await browser.close();
  fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
})().catch((error) => { console.error(error); process.exit(1); });
