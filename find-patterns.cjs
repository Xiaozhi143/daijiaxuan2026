const fs = require('fs');

const content = fs.readFileSync('c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js', 'utf8');

const patterns = ['car/', 'kid/', 'mf/', 'eater/'];

patterns.forEach(pattern => {
  const count = (content.match(new RegExp(pattern, 'g')) || []).length;
  console.log(`${pattern}: ${count} 次`);
  
  if (count > 0) {
    const idx = content.indexOf(pattern);
    const start = Math.max(0, idx - 10);
    const end = Math.min(content.length, idx + 50);
    console.log(`示例: ${content.substring(start, end)}`);
    console.log();
  }
});
