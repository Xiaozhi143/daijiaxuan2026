const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
let buffer = fs.readFileSync(filePath);
let content = buffer.toString('utf8');

console.log('=== 直接修复所有乱码路径 ===\n');

// 直接用字符串替换
const fixes = [
  ['鍏酰浼犲', '入口 '],
  ['鍥剧墖12', '图片12'],
  ['鍥剧墖7', '图片7'],
  ['鍥剧墖8', '图片8'],
  ['鍥剧墖9', '图片9'],
  ['鍥剧墖10', '图片10'],
];

let fixed = 0;

fixes.forEach(([wrong, correct]) => {
  const count = content.split(wrong).length - 1;
  
  if (count > 0) {
    content = content.split(wrong).join(correct);
    console.log(`✓ 修复 ${count} 个: ${wrong} -> ${correct}`);
    fixed += count;
  }
});

if (fixed > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\n=== 成功修复 ${fixed} 个路径 ===`);
} else {
  console.log('\n没有找到需要修复的内容');
}
