const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
let buffer = fs.readFileSync(filePath);

console.log('=== 字节替换修复 ===\n');

// 替换 鍏酰 -> 入口 (实际上这两个字的UTF-8编码是一样的)
const search1 = Buffer.from('鍏酰');
const replace1 = Buffer.from('入口');

// 替换 鍥剧墖 -> 图片
const search2 = Buffer.from('鍥剧墖');
const replace2 = Buffer.from('图片');

// 替换 鎬绘捣鎶 -> 总海报
const search3 = Buffer.from('鎬绘捣鎶');
const replace3 = Buffer.from('总海报');

let fixed = 0;

// 替换鍏酰
let idx1 = buffer.indexOf(search1);
if (idx1 !== -1) {
  const before = buffer.slice(0, idx1);
  const after = buffer.slice(idx1 + search1.length);
  buffer = Buffer.concat([before, replace1, after]);
  console.log(`✓ 替换鍏酰 -> 入口`);
  fixed++;
}

// 替换鍥剧墖
let idx2 = buffer.indexOf(search2);
while (idx2 !== -1) {
  const before = buffer.slice(0, idx2);
  const after = buffer.slice(idx2 + search2.length);
  buffer = Buffer.concat([before, replace2, after]);
  idx2 = buffer.indexOf(search2);
  fixed++;
}
console.log(`✓ 替换鍥剧墖 -> 图片 (${fixed - 1}次)`);

// 替换鎬绘捣鎶
let idx3 = buffer.indexOf(search3);
if (idx3 !== -1) {
  const before = buffer.slice(0, idx3);
  const after = buffer.slice(idx3 + search3.length);
  buffer = Buffer.concat([before, replace3, after]);
  console.log(`✓ 替换鎬绘捣鎶 -> 总海报`);
  fixed++;
}

if (fixed > 0) {
  fs.writeFileSync(filePath, buffer);
  console.log(`\n=== 成功修复 ${fixed} 个问题 ===`);
}
