const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
let buffer = fs.readFileSync(filePath);

console.log('=== 精确字节替换 ===\n');

// 鍏ュ彛 (e585a5e58fa3) -> 入口 (e585a5e58fa3)
const search1 = Buffer.from([0xe5, 0x85, 0xa5, 0xe5, 0x8f, 0xa3]); // 鍏酰实际上这个相同
const replace1 = Buffer.from([0xe5, 0x85, 0xa5, 0xe5, 0x8f, 0xa3]);

// 鍥剧墖12.png 的字节
// 鍥 (e59bbe), 剧 (e78987), 墖 -> 图 (e59bbe, e78987 are 图片)
// 12.png
const search2 = Buffer.from([0xe5, 0x9b, 0xbe, 0xe7, 0x89, 0x87, 0x31, 0x32, 0x2e, 0x70, 0x6e, 0x67]); // 鍥剧墖12.png
const replace2 = Buffer.from([0xe5, 0x9b, 0xbe, 0xe7, 0x89, 0x87, 0x31, 0x32, 0x2e, 0x70, 0x6e, 0x67]); // 图片12.png

// 让我提取实际的文件内容来获取正确的字节
const content = buffer.toString('utf8');
const idx2 = content.indexOf('鍥剧墖12.png');
if (idx2 !== -1) {
  const actualBytes = Buffer.from(content.substring(idx2, idx2 + 12), 'utf8');
  console.log('鍥剧墖12.png 实际字节:', actualBytes.toString('hex'));
  
  const correctBytes = Buffer.from('图片12.png', 'utf8');
  console.log('图片12.png 正确字节:', correctBytes.toString('hex'));
}
