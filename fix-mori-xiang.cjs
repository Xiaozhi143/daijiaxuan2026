const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('=== 修复中文乱码路径 ===\n');

const replacements = [
  { from: '鍏ュ彛 .png', to: '入口 .png' },
  { from: '鍥剧墖12.png', to: '图片12.png' },
  { from: '鍥剧墖7.png', to: '图片7.png' },
  { from: '鍥剧墖8.png', to: '图片8.png' },
  { from: '鎬绘捣鎶', to: '总海报' }
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
  console.log(`\n=== 成功修复 ${fixed} 个路径 ===`);
} else {
  console.log('\n没有找到需要修复的路径');
}
