const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
const content = fs.readFileSync(filePath, 'utf8');

// 查找包含鍏的文件位置
const idx1 = content.indexOf('鍏');
if (idx1 !== -1) {
  console.log('找到 "鍏" 在位置:', idx1);
  const bytes = [];
  for (let i = idx1; i < idx1 + 10 && i < content.length; i++) {
    bytes.push({
      char: content[i],
      code: content.charCodeAt(i),
      hex: content.charCodeAt(i).toString(16)
    });
  }
  console.log('字符详情:', bytes);
}

// 查找包含鍥的文件位置
const idx2 = content.indexOf('鍥');
if (idx2 !== -1) {
  console.log('\n找到 "鍥" 在位置:', idx2);
  const bytes = [];
  for (let i = idx2; i < idx2 + 10 && i < content.length; i++) {
    bytes.push({
      char: content[i],
      code: content.charCodeAt(i),
      hex: content.charCodeAt(i).toString(16)
    });
  }
  console.log('字符详情:', bytes);
}

// 查找包含鎬的文件位置
const idx3 = content.indexOf('鎬');
if (idx3 !== -1) {
  console.log('\n找到 "鎬" 在位置:', idx3);
  const bytes = [];
  for (let i = idx3; i < idx3 + 10 && i < content.length; i++) {
    bytes.push({
      char: content[i],
      code: content.charCodeAt(i),
      hex: content.charCodeAt(i).toString(16)
    });
  }
  console.log('字符详情:', bytes);
}
