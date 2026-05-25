const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
let content = fs.readFileSync(filePath, 'utf8');

// 查找包含鍥的行
let idx = content.indexOf('鍥');
if (idx !== -1) {
  console.log('找到 "鍥" 字符');
  const start = Math.max(0, idx - 20);
  const end = Math.min(content.length, idx + 50);
  const snippet = content.substring(start, end);
  console.log('上下文:', snippet);
  console.log('\n直接替换：');
  content = content.split('鍥').join('图片');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ 已替换所有 "鍥" 为 "图片"');
} else {
  console.log('未找到 "鍥" 字符');
}

// 查找鍏
idx = content.indexOf('鍏');
if (idx !== -1) {
  console.log('\n找到 "鍏" 字符');
  content = content.split('鍏酰浼犲').join('入口 ');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ 已替换 "鍏酰浼犲" 为 "入口 "');
} else {
  console.log('\n未找到 "鍏" 字符');
}
