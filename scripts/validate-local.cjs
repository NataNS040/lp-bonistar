const { chromium } = require('C:/Users/natap/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const outDir = path.resolve('audit/v2');
  const previewDir = path.join(outDir, 'previews');
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(previewDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const profiles = [
    { name: 'desktop-1440x900', viewport: { width: 1440, height: 900 }, isMobile: false },
    { name: 'tablet-768x1024', viewport: { width: 768, height: 1024 }, isMobile: false },
    { name: 'mobile-390x844', viewport: { width: 390, height: 844 }, isMobile: true },
  ];
  const report = {};

  for (const profile of profiles) {
    const context = await browser.newContext({ viewport: profile.viewport, isMobile: profile.isMobile, deviceScaleFactor: 1, locale: 'pt-BR' });
    const page = await context.newPage();
    const errors = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
    page.on('pageerror', (error) => errors.push(`page: ${error.message}`));
    page.on('requestfailed', (request) => { if (!request.url().includes('fonts.googleapis.com') && !request.url().includes('fonts.gstatic.com')) errors.push(`request: ${request.url()} — ${request.failure()?.errorText}`); });
    await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle', timeout: 60000 });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += Math.max(500, innerHeight * .75)) {
        scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 160));
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 350));
    });
    await page.screenshot({ path: path.join(outDir, `${profile.name}.png`), fullPage: true });
    await page.screenshot({ path: path.join(previewDir, `${profile.name}.jpg`), type: 'jpeg', quality: 72, fullPage: true });
    report[profile.name] = await page.evaluate(() => ({
      title: document.title,
      h1Count: document.querySelectorAll('h1').length,
      dimensions: { scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, scrollHeight: document.documentElement.scrollHeight },
      imageStatus: [...document.images].map((image) => ({ src: image.getAttribute('src'), loaded: image.complete && image.naturalWidth > 0, rendered: [Math.round(image.getBoundingClientRect().width), Math.round(image.getBoundingClientRect().height)] })),
      emptyLinks: [...document.querySelectorAll('a')].filter((a) => !a.getAttribute('href')).length,
      ctaCount: [...document.querySelectorAll('a')].filter((a) => /viajar\.embonitoms\.com\.br/.test(a.href)).length,
      mainLandmark: Boolean(document.querySelector('main')),
      navLandmark: Boolean(document.querySelector('nav[aria-label]')),
    }));
    report[profile.name].errors = errors;
    await context.close();
  }
  fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));
  await browser.close();
  console.log(JSON.stringify(report, null, 2));
})().catch((error) => { console.error(error); process.exit(1); });
