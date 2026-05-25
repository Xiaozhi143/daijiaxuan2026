const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
const content = fs.readFileSync(filePath, 'utf8');

// 检查所有 mori 路径
const moriPattern = /mori\/[^"]+\.png/g;
const matches = content.match(moriPattern);

console.log('=== 检查所有 mori 路径 ===\n');

if (matches) {
  matches.forEach((m, i) => {
    console.log(`${i + 1}. ${m}`);
  });
}

// 检查是否有乱码字符
console.log('\n检查乱码字符：');
const garbledChars = ['鍏', '鍥', '鎬', '娴'];
garbledChars.forEach(char => {
  const count = (content.match(new RegExp(char, 'g')) || []).length;
  if (count > 0) {
    console.log(`✗ ${char}: ${count} 次`);
  } else {
    console.log(`✓ ${char}: 0 次`);
  }
});
