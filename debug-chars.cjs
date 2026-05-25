const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
const content = fs.readFileSync(filePath, 'utf8');

// 查找"鍥剧墖12"的字节
const searchTerm = '鍥剧墖12';
let idx = content.indexOf(searchTerm);

if (idx !== -1) {
  console.log(`找到 "${searchTerm}" 在位置 ${idx}`);
  
  // 获取这个位置的字节
  const charBytes = [];
  for (let i = idx; i < idx + 20 && i < content.length; i++) {
    charBytes.push(content.charCodeAt(i));
  }
  
  console.log('字符码:', charBytes);
  console.log('前几个字符:', content.substring(idx, idx + 5));
  
  // 获取字节的hex
  const buf = Buffer.from(content.substring(idx, idx + 20), 'utf8');
  console.log('字节hex:', buf.toString('hex'));
}
