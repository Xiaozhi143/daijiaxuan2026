const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-Dnl5O9fy.js';
const content = fs.readFileSync(filePath, 'utf8');

console.log('=== 检查 mori 和 xiang 目录的图片引用 ===\n');

const regex = /"([^"]*(?:mori|xiang)[^"]*\.(?:png|jpg|jpeg|webp))"/g;
const matches = [];
let match;

while ((match = regex.exec(content)) !== null) {
  matches.push(match[1]);
}

console.log(`找到 ${matches.length} 个 mori/xiang 相关的图片引用:\n`);

matches.forEach((path, i) => {
  console.log(`${i + 1}: ${path}`);
  
  const filename = path.split('/').pop();
  const dir = path.includes('/mori/') ? 'mori/' : 'xiang/';
  
  let exists = false;
  if (path.includes('宣传海报')) {
    exists = fs.existsSync(`c:/git/daijiaxuan2026/mori/宣传海报/${filename}`);
  } else if (path.includes('cj')) {
    exists = fs.existsSync(`c:/git/daijiaxuan2026/mori/cj/${filename}`);
  } else {
    exists = fs.existsSync(`c:/git/daijiaxuan2026/${dir}${filename}`);
  }
  
  console.log(`  文件名: ${filename}`);
  console.log(`  存在: ${exists ? '✓' : '✗'}\n`);
});
