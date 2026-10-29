// Rebuilds the Tailwind styles embedded in index.html (<style id="tw-prebuilt">), so the page can draw
// without waiting for the Tailwind CDN. Run after adding or changing Tailwind classes:
//   node scripts/build-css.js
// (needs Node.js; downloads tailwindcss v3 with npx the first time)
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const file = path.join(__dirname, '..', 'index.html');
const out = path.join(os.tmpdir(), 'tw-prebuilt.css');
execSync(`npx --yes tailwindcss@3 -c /dev/null --content "${file}" -o "${out}" --minify`, { stdio: 'inherit' });
const css = fs.readFileSync(out, 'utf8').trim();
const html = fs.readFileSync(file, 'utf8');
const re = /(<style id="tw-prebuilt">)[\s\S]*?(<\/style>)/;
if (!re.test(html)) throw new Error('tw-prebuilt <style> block not found in index.html');
fs.writeFileSync(file, html.replace(re, (_, a, b) => a + css + b));
console.log(`Embedded ${css.length} bytes of Tailwind CSS into index.html`);
