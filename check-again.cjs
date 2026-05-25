const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
const content = fs.readFileSync(filePath, 'utf8');

console.log('=== 再次检查特定路径 ===\n');

// 检查所有包含 ${ 的路径
const templatePattern = /\$\{[^}]+\}/g;
const templateMatches = content.match(templatePattern);
if (templateMatches) {
  console.log('找到模板变量:');
  templateMatches.slice(0, 10).forEach(m => console.log(`   ${m}`));
}

// 检查乱码字符
console.log('\n检查乱码:');
const garbledChars = ['鍥', '鎬', '娴', '紶', '瀹', '鍏', '鍏'];
garbledChars.forEach(char => {
  const count = (content.match(new RegExp(char, 'g')) || []).length;
  if (count > 0) {
    console.log(`   ✗ ${char}: ${count} 次`);
  }
});

// 提取所有 /daijiaxuan2026/mori/ 和 /daijiaxuan2026/xiang/ 的路径
console.log('\n所有 mori 路径:');
const moriPattern = /"\/daijiaxuan2026\/mori\/[^"]+"/g;
const moriMatches = content.match(moriPattern);
if (moriMatches) {
  moriMatches.forEach(m => console.log(`   ${m}`));
}

console.log('\n所有 xiang 路径:');
const xiangPattern = /"\/daijiaxuan2026\/xiang\/[^"]+"/g;
const xiangMatches = content.match(xiangPattern);
if (xiangMatches) {
  xiangMatches.forEach(m => console.log(`   ${m}`));
}
