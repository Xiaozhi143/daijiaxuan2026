const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
const content = fs.readFileSync(filePath, 'utf8');

console.log('=== 检查特定文件夹的图片路径 ===\n');

// 检查 mori/cj 路径
console.log('1. mori/cj 文件夹:');
const cjPattern = /mori\/cj\/[^"]+\.png/g;
const cjMatches = content.match(cjPattern);
if (cjMatches) {
  cjMatches.forEach(m => console.log(`   ${m}`));
} else {
  console.log('   未找到 mori/cj 路径');
}

// 检查 mori/宣传海报 路径
console.log('\n2. mori/宣传海报 文件夹:');
const xuanchuanPattern = /mori\/[^"]*宣传[^"]*compressed[^"]+\.jpg/g;
const xuanchuanMatches = content.match(xuanchuanPattern);
if (xuanchuanMatches) {
  xuanchuanMatches.forEach(m => console.log(`   ${m}`));
} else {
  console.log('   未找到宣传海报路径');
}

// 检查 xiang 路径
console.log('\n3. xiang 文件夹:');
const xiangPattern = /xiang\/[^"]+\.jpg/g;
const xiangMatches = content.match(xiangPattern);
if (xiangMatches) {
  xiangMatches.forEach(m => console.log(`   ${m}`));
} else {
  console.log('   未找到 xiang 路径');
}

// 检查是否有乱码
console.log('\n检查乱码字符:');
const garbledChars = ['鍥', '鎬', '娴', '紶'];
garbledChars.forEach(char => {
  const count = (content.match(new RegExp(char, 'g')) || []).length;
  if (count > 0) {
    console.log(`   ✗ ${char}: ${count} 次`);
  }
});
