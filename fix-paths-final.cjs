const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-Dnl5O9fy.js';
let buffer = fs.readFileSync(filePath);

console.log('=== 直接替换路径 ===\n');

const pathReplacements = [
  { 
    from: '/daijiaxuan2026/mori/鍥剧墖12.png',
    to: '/daijiaxuan2026/mori/图片12.png'
  },
  {
    from: '/daijiaxuan2026/mori/鍏ュ彛 .png',
    to: '/daijiaxuan2026/mori/入口 .png'
  },
  {
    from: '/daijiaxuan2026/xiang/鎬绘捣鎶',
    to: '/daijiaxuan2026/xiang/总海报'
  }
];

let content = buffer.toString('utf8');
let fixed = 0;

pathReplacements.forEach(r => {
  const count = (content.match(new RegExp(r.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  
  if (count > 0) {
    content = content.replace(new RegExp(r.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), r.to);
    console.log(`✓ 替换 ${count} 个: ${r.from}`);
    console.log(`  → ${r.to}\n`);
    fixed += count;
  } else {
    console.log(`✗ 未找到: ${r.from}\n`);
  }
});

if (fixed > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`=== 成功替换 ${fixed} 个路径 ===`);
} else {
  console.log('没有找到需要替换的路径');
}
