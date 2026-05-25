const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('=== 修复中文乱码路径 ===\n');

// 替换规则：乱码 -> 正确
const replacements = [
  { from: '鍏酰浼犲', to: '入口 .png', in: '/daijiaxuan2026/mori/' },
  { from: '鍥剧墖12', to: '图片12', in: '/daijiaxuan2026/mori/' },
  { from: '鍥剧墖7', to: '图片7', in: '/daijiaxuan2026/mori/' },
  { from: '鍥剧墖8', to: '图片8', in: '/daijiaxuan2026/mori/' },
  { from: '鍥剧墖9', to: '图片9', in: '/daijiaxuan2026/mori/' },
  { from: '鍥剧墖10', to: '图片10', in: '/daijiaxuan2026/mori/' },
  { from: '鎬绘捣鎶', to: '总海报', in: '/daijiaxuan2026/xiang/' }
];

let fixed = 0;

replacements.forEach(r => {
  // 只在指定路径中替换
  const pattern = new RegExp(r.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  const matches = content.match(pattern);
  
  if (matches && matches.length > 0) {
    const fullPattern = new RegExp(r.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    content = content.replace(fullPattern, r.to);
    console.log(`✓ 修复 ${matches.length} 个: ${r.from} -> ${r.to}`);
    fixed += matches.length;
  }
});

if (fixed > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\n=== 成功修复 ${fixed} 个路径 ===`);
} else {
  console.log('没有找到需要修复的路径');
}
