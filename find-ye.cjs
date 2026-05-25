const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh-github.js';
const content = fs.readFileSync(filePath, 'utf8');

const count = (content.match(/瀹/g) || []).length;
console.log(`发现 "瀹": ${count} 次`);

// 查找包含瀹的上下文
let idx = content.indexOf('瀹');
if (idx !== -1) {
  console.log(`\n找到 "瀹" 在位置 ${idx}`);
  const start = Math.max(0, idx - 20);
  const end = Math.min(content.length, idx + 50);
  const snippet = content.substring(start, end);
  console.log('上下文:', snippet);
}

// 查找包含娴的上下文
idx = content.indexOf('娴');
if (idx !== -1) {
  console.log(`\n找到 "娴" 在位置 ${idx}`);
  const start = Math.max(0, idx - 20);
  const end = Math.min(content.length, idx + 50);
  const snippet = content.substring(start, end);
  console.log('上下文:', snippet);
}
