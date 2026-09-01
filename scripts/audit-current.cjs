const { chromium } = require('C:/Users/natap/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const outDir = path.resolve('audit/current');
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const results = {};

  for (const profile of [
    { name: 'desktop', viewport: { width: 1440, height: 900 }, isMobile: false },
    { name: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true },
  ]) {
    const context = await browser.newContext({
      viewport: profile.viewport,
      isMobile: profile.isMobile,
      deviceScaleFactor: 1,
      locale: 'pt-BR',
    });
    const page = await context.newPage();
    const requests = [];
    page.on('request', (request) => {
      const url = request.url();
      if (/google|gtm|analytics|facebook|meta|pixel|hotjar|whatsapp|wa\.me|form/i.test(url)) requests.push(url);
    });
    await page.goto('https://www.embonitoms.com.br/lp', { waitUntil: 'networkidle', timeout: 90000 });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += Math.max(500, innerHeight * 0.75)) {
        scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 180));
      }
      scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 500));
    });
    await page.screenshot({ path: path.join(outDir, `${profile.name}.png`), fullPage: true });
    results[profile.name] = await page.evaluate(() => ({
      title: document.title,
      metaDescription: document.querySelector('meta[name="description"]')?.content || '',
      bodyText: document.body.innerText,
      headings: [...document.querySelectorAll('h1,h2,h3,h4')].map((el) => ({ tag: el.tagName, text: el.innerText.trim() })).filter((x) => x.text),
      links: [...document.querySelectorAll('a')].map((el) => ({ text: el.innerText.trim(), href: el.href, ariaLabel: el.getAttribute('aria-label') })).filter((x) => x.href),
      buttons: [...document.querySelectorAll('button')].map((el) => ({ text: el.innerText.trim(), ariaLabel: el.getAttribute('aria-label') })),
      forms: [...document.forms].map((form) => ({ action: form.action, method: form.method, fields: [...form.elements].map((el) => ({ tag: el.tagName, type: el.type, name: el.name, placeholder: el.placeholder })) })),
      images: [...document.images].map((img) => ({ src: img.currentSrc || img.src, alt: img.alt, width: img.naturalWidth, height: img.naturalHeight, loading: img.loading })),
      scripts: [...document.scripts].map((s) => s.src || s.textContent.slice(0, 300)).filter(Boolean),
      fixed: [...document.querySelectorAll('body *')].filter((el) => getComputedStyle(el).position === 'fixed').map((el) => ({ tag: el.tagName, text: el.innerText?.trim().slice(0, 120), className: String(el.className).slice(0, 200) })),
      dimensions: { scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, scrollHeight: document.documentElement.scrollHeight },
      styles: { bodyFont: getComputedStyle(document.body).fontFamily, bodyColor: getComputedStyle(document.body).color, bodyBackground: getComputedStyle(document.body).backgroundColor },
    }));
    results[profile.name].trackingRequests = [...new Set(requests)];
    await context.close();
  }

  fs.writeFileSync(path.join(outDir, 'audit.json'), JSON.stringify(results, null, 2));
  await browser.close();
  console.log(JSON.stringify({ ok: true, output: outDir, profiles: Object.keys(results) }));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
