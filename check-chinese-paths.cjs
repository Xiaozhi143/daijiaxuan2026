const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-Dnl5O9fy.js';
const content = fs.readFileSync(filePath, 'utf8');

const searchTerms = [
  '图片12.png',
  '入口 .png',
  '宣传海报',
  '总海报'
];

searchTerms.forEach(term => {
  let idx = content.indexOf(term);
  if (idx !== -1) {
    const start = Math.max(0, idx - 100);
    const end = Math.min(content.length, idx + term.length + 100);
    const snippet = content.substring(start, end);
    
    console.log(`\n=== 搜索 "${term}" ===`);
    console.log('上下文:');
    console.log(snippet);
    console.log('\n');
  } else {
    console.log(`\n未找到: ${term}`);
  }
});
