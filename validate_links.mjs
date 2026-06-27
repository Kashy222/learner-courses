import fs from 'fs';

const syllabus = fs.readFileSync('src/data/syllabus.ts', 'utf-8');
const urls = [...syllabus.matchAll(/url:\s*"([^"]+)"/g)].map(m => m[1]);

async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) return { url, valid: false, reason: `Status ${res.status}` };
    
    const text = await res.text();
    
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      if (text.includes('<title>YouTube</title>') || text.includes('"playabilityStatus":{"status":"ERROR"')) {
        return { url, valid: false, reason: 'Video unavailable' };
      }
    } else {
      if (text.toLowerCase().includes('<title>404')) {
        return { url, valid: false, reason: '404 in title' };
      }
    }
    return { url, valid: true };
  } catch (err) {
    return { url, valid: false, reason: err.message };
  }
}

async function main() {
  console.log(`Checking ${urls.length} URLs...`);
  let invalid = 0;
  for (const url of urls) {
    const res = await checkUrl(url);
    if (!res.valid) {
      console.log(`❌ INVALID: ${url} (${res.reason})`);
      invalid++;
    } else {
      // console.log(`✅ VALID: ${url}`);
    }
  }
  console.log(`\nDone. ${invalid} invalid URLs found.`);
}

main();
