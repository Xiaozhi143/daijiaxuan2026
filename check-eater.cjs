const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-Dnl5O9fy.js';
const content = fs.readFileSync(filePath, 'utf8');

console.log('=== 检查 eater 相关路径 ===\n');

const regex = /"[^"]*eater[^"]*"/g;
const matches = content.match(regex) || [];

console.log(`找到 ${matches.length} 个包含 eater 的路径:`);
matches.forEach((m, i) => {
  console.log(`${i + 1}: ${m}`);
});

console.log('\n检查文件大小:');
const stats = fs.statSync(filePath);
console.log(`JS 文件大小: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
