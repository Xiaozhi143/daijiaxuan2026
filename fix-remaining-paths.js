const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('=== 修复剩余的7个路径 ===\n');

const remainingFixes = [
  { from: '"/mori/入口 .png"', to: '"/daijiaxuan2026/mori/入口 .png"' },
  { from: '"/mori/图片12.png"', to: '"/daijiaxuan2026/mori/图片12.png"' },
  { from: '"/eater/3.png"', to: '"/daijiaxuan2026/eater/3.png"' },
];

let fixedCount = 0;

remainingFixes.forEach(fix => {
  const count = (content.match(new RegExp(fix.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  
  if (count > 0) {
    content = content.replace(new RegExp(fix.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), fix.to);
    console.log(`✓ 修复 ${count} 个: ${fix.from}`);
    fixedCount += count;
  }
});

const searchCompressed = [
  { search: '鍥剧墖1(1)_compressed', replace: '/daijiaxuan2026/mori/宣传海报/图片1(1)_compressed' },
  { search: '鍥剧墖2(1)_compressed', replace: '/daijiaxuan2026/mori/宣传海报/图片2(1)_compressed' },
  { search: '鍥剧墖3(1)_compressed', replace: '/daijiaxuan2026/mori/宣传海报/图片3(1)_compressed' },
  { search: '鍥剧墖4(1)_compressed', replace: '/daijiaxuan2026/mori/宣传海报/图片4(1)_compressed' },
];

searchCompressed.forEach(item => {
  const idx = content.indexOf(item.search);
  if (idx !== -1) {
    const before = content.substring(0, idx);
    const after = content.substring(idx + item.search.length);
    content = before + item.replace + after;
    console.log(`✓ 修复: ${item.search}`);
    fixedCount++;
  }
});

if (fixedCount > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\n=== 成功修复 ${fixedCount} 个路径 ===`);
} else {
  console.log('\n没有找到需要修复的路径');
}
