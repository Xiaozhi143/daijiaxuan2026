const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('=== 修复所有乱码路径 ===\n');

const replacements = [
  { from: 'mori/鍏酰浼犲 .png', to: 'mori/入口 .png' },
  { from: 'mori/鍥剧墖12.png', to: 'mori/图片12.png' },
  { from: 'mori/鍥剧墖7.png', to: 'mori/图片7.png' },
  { from: 'mori/鍥剧墖8.png', to: 'mori/图片8.png' },
  { from: 'mori/鍥剧墖9.png', to: 'mori/图片9.png' },
  { from: 'mori/鍥剧墖10.png', to: 'mori/图片10.png' },
];

let fixed = 0;

replacements.forEach(r => {
  const count = (content.match(new RegExp(r.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  
  if (count > 0) {
    content = content.replace(new RegExp(r.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), r.to);
    console.log(`✓ 修复 ${count} 个: ${r.from} -> ${r.to}`);
    fixed += count;
  } else {
    console.log(`✗ 未找到: ${r.from}`);
  }
});

if (fixed > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\n=== 成功修复 ${fixed} 个乱码路径 ===`);
} else {
  console.log('\n没有找到需要修复的乱码路径');
}
