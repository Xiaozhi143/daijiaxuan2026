const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
const content = fs.readFileSync(filePath, 'utf8');

console.log('=== 验证新构建的 JS 文件 ===\n');

// 检查乱码字符
console.log('检查乱码字符:');
const garbledChars = ['鍥', '鎬', '娴', '紶', '瀹', '鍏'];
let hasGarbled = false;
garbledChars.forEach(char => {
  const count = (content.match(new RegExp(char, 'g')) || []).length;
  if (count > 0) {
    console.log(`   ✗ ${char}: ${count} 次`);
    hasGarbled = true;
  }
});

if (!hasGarbled) {
  console.log('   ✓ 没有乱码字符');
}

// 检查正确的路径
console.log('\n检查正确的路径:');
const moriPattern = /"\/daijiaxuan2026\/mori\/[^"]+\.(png|jpg)"/g;
const moriMatches = content.match(moriPattern);
if (moriMatches) {
  console.log('\nmori 路径:');
  moriMatches.slice(0, 5).forEach(m => console.log(`   ${m}`));
}

const xiangPattern = /"\/daijiaxuan2026\/xiang\/[^"]+\.jpg"/g;
const xiangMatches = content.match(xiangPattern);
if (xiangMatches) {
  console.log('\nxiang 路径:');
  xiangMatches.slice(0, 3).forEach(m => console.log(`   ${m}`));
}
