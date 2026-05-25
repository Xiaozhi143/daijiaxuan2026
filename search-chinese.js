const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
const content = fs.readFileSync(filePath, 'utf8');

console.log('搜索特征字符串...\n');

const searchTerms = ['娴', '瀹', '紶', '鍥', 'compressed'];

searchTerms.forEach(term => {
  const idx = content.indexOf(term);
  if (idx !== -1) {
    console.log(`✓ 找到 "${term}" 在位置 ${idx}`);
    
    const start = Math.max(0, idx - 50);
    const end = Math.min(content.length, idx + 100);
    const snippet = content.substring(start, end);
    
    console.log(`  上下文: ${snippet}`);
    console.log();
  } else {
    console.log(`✗ 未找到 "${term}"`);
  }
});
