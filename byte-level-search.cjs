const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
let buffer = fs.readFileSync(filePath);

console.log('=== 字节级别修复乱码 ===\n');

// 搜索需要修复的字节序列
const searchTerms = [
  Buffer.from([0xe5, 0x85, 0xa5, 0xe5, 0x8f, 0xa3]), // 鍏酰
  Buffer.from([0xe5, 0x9b, 0xbe, 0xe7, 0x89, 0x87]), // 鍥剧墖
  Buffer.from([0xe6, 0x80, 0xbb, 0xe6, 0xb5, 0xb7, 0xe6, 0x8a, 0xa5]), // 鎬绘捣鎶
];

let content = buffer.toString('utf8');

searchTerms.forEach((term, i) => {
  let idx = buffer.indexOf(term);
  if (idx !== -1) {
    console.log(`找到字节序列 ${i + 1} 在位置 ${idx}`);
    
    // 提取周围的内容
    const start = Math.max(0, idx - 10);
    const end = Math.min(buffer.length, idx + 50);
    const snippet = buffer.slice(start, end);
    console.log('上下文:', snippet.toString('utf8', 0, 50));
    
    // 查找并替换
    const strSnippet = snippet.toString('utf8');
    console.log('对应的字符串:', strSnippet);
  }
});
