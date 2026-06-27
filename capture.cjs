const { chromium } = require('playwright');
const fs = require('fs');

async function extractNavLinks(page) {
  return await page.evaluate(() => {
    const links = [];
    const seen = new Set([location.pathname]);
    const skip = /\/(login|logout|signup|sign-in|register|auth|account|checkout|cart|password|reset)\b/i;
    document.querySelectorAll('nav a, header a, [role="navigation"] a').forEach(a => {
      try {
        const u = new URL(a.href);
        if (u.hostname !== location.hostname) return;
        if (skip.test(u.pathname)) return;
        if (seen.has(u.pathname)) return;
        if (u.pathname === '/' && location.pathname !== '/') return;
        seen.add(u.pathname);
        links.push({ href: u.origin + u.pathname, text: (a.innerText || a.textContent).trim().slice(0, 40) });
      } catch(e) {}
    });
    return links.slice(0, 6);
  });
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  
  const extractCode = fs.readFileSync('.agents/skills/taste/references/extract.js', 'utf8');
  const pagesData = [];

  const capturePage = async (url, prefix, waitTime = 3000) => {
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(waitTime);
    
    await page.screenshot({ path: `${prefix}.jpeg`, type: 'jpeg' });
    await page.screenshot({ path: `${prefix}-full.jpeg`, type: 'jpeg', fullPage: true });
    
    const domData = await page.evaluate(`
      const fn = ${extractCode};
      fn();
    `);
    
    let links = [];
    if (prefix === 'taste-viewport') {
        links = await extractNavLinks(page);
    }
    
    await page.close();
    return { domData, links };
  };

  try {
    const primary = await capturePage('https://linear.app', 'taste-viewport');
    pagesData.push(primary.domData);
    
    // Pick 2 links
    const validLinks = primary.links.filter(l => !l.href.includes('/product/features/detail')).slice(0, 2);
    
    for (let i = 0; i < validLinks.length; i++) {
        try {
            const extra = await capturePage(validLinks[i].href, `taste-viewport-${i+2}`);
            pagesData.push(extra.domData);
        } catch(e) { console.error('Skipped link', validLinks[i].href); }
    }
    
    fs.writeFileSync('domData.json', JSON.stringify(pagesData, null, 2));
    console.log('Capture complete.');
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await browser.close();
  }
})();
