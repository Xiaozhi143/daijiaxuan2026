const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
const content = fs.readFileSync(filePath, 'utf8');

// 搜索鍥剧墖12.png
const search1 = '鍥剧墖12.png';
let idx1 = content.indexOf(search1);
console.log('搜索 "鍥剧墖12.png":', idx1 !== -1 ? '找到' : '未找到');

// 搜索图片12.png
const search2 = '图片12.png';
let idx2 = content.indexOf(search2);
console.log('搜索 "图片12.png":', idx2 !== -1 ? '找到' : '未找到');

// 搜索mori/图片
const search3 = '/daijiaxuan2026/mori/图片';
let idx3 = content.indexOf(search3);
console.log('搜索 "/daijiaxuan2026/mori/图片":', idx3 !== -1 ? '找到' : '未找到');

if (idx3 !== -1) {
  const start = Math.max(0, idx3 - 20);
  const end = Math.min(content.length, idx3 + 50);
  const snippet = content.substring(start, end);
  console.log('上下文:', snippet);
}
