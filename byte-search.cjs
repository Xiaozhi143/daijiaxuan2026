const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
let buffer = fs.readFileSync(filePath);

console.log('=== 字节级修复 ===\n');

// 修复鍏ュ彛 .png -> 入口 .png
const from1 = Buffer.from([0xe5, 0x85, 0xa5, 0xe5, 0x8f, 0xa3]); // 鍏ュ彛
const to1 = Buffer.from([0xe5, 0x85, 0xa5, 0xe5, 0x8f, 0xa3]); // 入口

// 鍥剧墖 -> 图片
const from2 = Buffer.from([0xe5, 0x9b, 0xbe, 0xe7, 0x89, 0x87]); // 鍥剧墖
const to2 = Buffer.from([0xe5, 0x9b, 0xbe, 0xe7, 0x89, 0x87]); // 图片

// 鎬绘捣鎶 -> 总海报
const from3 = Buffer.from([0xe6, 0x80, 0xbb, 0xe6, 0xb5, 0xb7, 0xe6, 0x8a, 0xa5]); // 鎬绘捣鎶
const to3 = Buffer.from([0xe6, 0x80, 0xbb, 0xe6, 0xb5, 0xb7, 0xe6, 0x8a, 0xa5]); // 总海报

// 让我先搜索实际存在的字节序列
const searchTerms = [
  Buffer.from([0xe5, 0x85, 0xa5]), // 鍏
  Buffer.from([0xe5, 0x9b, 0xbe]), // 鍥
  Buffer.from([0xe6, 0x80, 0xbb])  // 鎬
];

searchTerms.forEach((term, i) => {
  let idx = buffer.indexOf(term);
  if (idx !== -1) {
    console.log(`找到特征字节 ${i} 在位置 ${idx}`);
    
    // 提取周围的字节
    const snippet = buffer.slice(idx, idx + 20);
    console.log('上下文:', snippet.toString('utf8', 0, 20));
    console.log('字节:', snippet.toString('hex', 0, 20));
  }
});
