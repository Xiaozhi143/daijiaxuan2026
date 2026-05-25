const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
const content = fs.readFileSync(filePath, 'utf8');

// 查找所有包含 mori 的路径
const moriPattern = /mori\/[^"]+\.png/g;
const matches = content.match(moriPattern);

if (matches) {
  console.log('mori 目录下的所有图片路径：\n');
  matches.forEach((m, i) => {
    console.log(`${i + 1}. ${m}`);
  });
}
