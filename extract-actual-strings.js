const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
const content = fs.readFileSync(filePath, 'utf8');

console.log('提取实际存在的字符串...\n');

const search = 'compressed.jpg';
let idx = content.indexOf(search);

if (idx !== -1) {
  const start = idx - 600;
  const substring = content.substring(start, idx + 20);
  
  console.log('找到的片段:');
  console.log(substring);
  console.log('\n');
  
  const parts = substring.split('"');
  parts.forEach((part, i) => {
    if (part.includes('compressed')) {
      console.log(`找到路径 ${i}: ${part}`);
    }
  });
}
