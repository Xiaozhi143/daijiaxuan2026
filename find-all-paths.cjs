const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
const content = fs.readFileSync(filePath, 'utf8');

// 搜索所有包含乱码的路径
const patterns = [
  '/daijiaxuan2026/mori/',
  '/daijiaxuan2026/xiang/'
];

patterns.forEach(pattern => {
  let idx = content.indexOf(pattern);
  let count = 0;
  
  while (idx !== -1 && count < 5) {
    const snippet = content.substring(idx, idx + 50);
    console.log(`\n找到 ${pattern} 在位置 ${idx}:`);
    console.log('上下文:', snippet);
    
    // 检查是否有乱码字符
    const hasGarbled = snippet.includes('鍥') || snippet.includes('鍏') || snippet.includes('鎬');
    console.log('包含乱码:', hasGarbled);
    
    idx = content.indexOf(pattern, idx + 1);
    count++;
  }
});
