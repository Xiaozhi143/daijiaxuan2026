const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
const content = fs.readFileSync(filePath, 'utf8');

console.log('=== 检查文件中的中文路径 ===\n');

// 搜索所有/daijiaxuan2026/mori/和/daijiaxuan2026/xiang/的路径
const regex = /"\/daijiaxuan2026\/[^"]*\.(png|jpg)"/g;
const matches = [];
let match;

while ((match = regex.exec(content)) !== null) {
  const path = match[0];
  
  // 检查是否包含中文字符
  const hasChinese = /[\u4e00-\u9fa5]/.test(path);
  
  if (hasChinese) {
    matches.push(path);
    console.log(`✓ 正常中文路径: ${path}`);
  } else {
    console.log(`✗ 异常路径（可能是乱码）: ${path}`);
  }
}

console.log(`\n总计: ${matches.length} 个正常中文路径`);
console.log(`\n检查是否有乱码字符:`);

// 检查常见的乱码模式
const garbledPatterns = ['鍏', '鍥', '鎬', '娴', '紶'];
garbledPatterns.forEach(char => {
  const count = (content.match(new RegExp(char, 'g')) || []).length;
  if (count > 0) {
    console.log(`✗ 发现乱码字符 "${char}": ${count} 次`);
  }
});
