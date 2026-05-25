const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
const content = fs.readFileSync(filePath, 'utf8');

const search = 'compressed.jpg';
let idx = content.indexOf(search);

if (idx !== -1) {
  const start = idx - 50;
  const substring = content.substring(start, idx + 30);
  
  console.log('要替换的原始字符串:');
  console.log(JSON.stringify(substring));
  
  const searchParts = [
    '鍥剧墖1(1)_compressed',
    '鍥剧墖2(1)_compressed',
    '鍥剧墖3(1)_compressed',
    '鍥剧墖4(1)_compressed'
  ];
  
  searchParts.forEach(part => {
    const partIdx = substring.indexOf(part);
    if (partIdx !== -1) {
      console.log(`\n找到 "${part}"`);
      console.log(`字节位置: ${partIdx}`);
      
      const charCodes = [];
      for (let i = 0; i < part.length; i++) {
        charCodes.push(substring.charCodeAt(start + partIdx + i));
      }
      console.log(`字符编码: [${charCodes.join(', ')}]`);
    }
  });
}
