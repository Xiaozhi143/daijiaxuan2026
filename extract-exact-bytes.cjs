const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-Dnl5O9fy.js';
const buffer = fs.readFileSync(filePath);

// 查找 "鍥剧墖12" 的位置
const searchTerm = Buffer.from([0xe5, 0x9b, 0xbe, 0xe7, 0x89, 0x87, 0x31, 0x32]); // 鍥剧墖12
let idx = buffer.indexOf(searchTerm);

if (idx !== -1) {
  console.log(`找到字节序列在位置 ${idx}`);
  
  // 提取这个位置之前的100个字节
  const start = Math.max(0, idx - 100);
  const end = Math.min(buffer.length, idx + 50);
  const snippet = buffer.slice(start, end);
  
  console.log('\n前100字节的十六进制:');
  console.log(snippet.slice(0, 100).toString('hex'));
  
  console.log('\n对应的字符串:');
  console.log(snippet.toString('utf8').substring(0, 100));
  
  // 提取鍥剧墖12.png的确切字节
  const imgStart = idx;
  const imgEnd = idx + 12; // 鍥剧墖12.png的长度
  const imgBytes = buffer.slice(imgStart, imgEnd);
  
  console.log('\n鍥剧墖12.png的字节:');
  console.log(imgBytes.toString('hex'));
  
  console.log('\n鍥剧墖12.png的字符串:');
  console.log(imgBytes.toString('utf8'));
}
