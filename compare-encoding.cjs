const fs = require('fs');

// 鍥剧墖 的字节
const s1 = Buffer.from('鍥剧墖', 'utf8');
console.log('鍥剧墖 的字节:', s1.toString('hex'));

// 图片 的字节
const s2 = Buffer.from('图片', 'utf8');
console.log('图片 的字节:', s2.toString('hex'));

// 检查是否相等
console.log('\n是否相等:', s1.equals(s2));

// 检查JS文件中的实际字节
const filePath = 'c:/git/daijiaxuan2026/assets/index-Dnl5O9fy.js';
const buffer = fs.readFileSync(filePath);

// 搜索 "鍥剧墖12"
const searchTerm = Buffer.from([0xe5, 0x9b, 0xbe, 0xe7, 0x89, 0x87, 0x31, 0x32]);
let idx = buffer.indexOf(searchTerm);

if (idx !== -1) {
  console.log(`\n找到鍥剧墖12在位置 ${idx}`);
  
  // 提取前6个字节（鍥剧墖）
  const charBytes = buffer.slice(idx, idx + 6);
  console.log('实际字节:', charBytes.toString('hex'));
  console.log('实际字符串:', charBytes.toString('utf8'));
}
