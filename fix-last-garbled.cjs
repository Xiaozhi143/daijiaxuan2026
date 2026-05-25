const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('=== 修复所有剩余的乱码路径 ===\n');

// 修复 mori 路径中的乱码
const moriFixes = [
  ['mori/鍏酰浼犲', 'mori/入口'],
  ['mori/鍥剧墖12', 'mori/图片12'],
  ['mori/鍥剧墖7', 'mori/图片7'],
  ['mori/鍥剧墖8', 'mori/图片8'],
  ['mori/鍥剧墖9', 'mori/图片9'],
  ['mori/鍥剧墖10', 'mori/图片10'],
];

// 修复 xiang 路径中的乱码
const xiangFixes = [
  ['xiang/鎬绘捣鎶', 'xiang/总海报'],
];

let fixed = 0;

[...moriFixes, ...xiangFixes].forEach(([wrong, correct]) => {
  const count = content.split(wrong).length - 1;
  
  if (count > 0) {
    content = content.split(wrong).join(correct);
    console.log(`✓ 修复 ${count} 个: ${wrong} -> ${correct}`);
    fixed += count;
  }
});

if (fixed > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\n=== 成功修复 ${fixed} 个问题 ===`);
} else {
  console.log('没有找到需要修复的内容');
}
