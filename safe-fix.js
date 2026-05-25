const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('=== 开始修复路径问题 ===\n');

const searchPatterns = [
  {
    name: '图片1(1)_compressed.jpg',
    search: '鍥剧墖1(1)_compressed',
    replace: '/daijiaxuan2026/mori/宣传海报/图片1(1)_compressed'
  },
  {
    name: '图片2(1)_compressed.jpg',
    search: '鍥剧墖2(1)_compressed',
    replace: '/daijiaxuan2026/mori/宣传海报/图片2(1)_compressed'
  },
  {
    name: '图片3(1)_compressed.jpg',
    search: '鍥剧墖3(1)_compressed',
    replace: '/daijiaxuan2026/mori/宣传海报/图片3(1)_compressed'
  },
  {
    name: '图片4(1)_compressed.jpg',
    search: '鍥剧墖4(1)_compressed',
    replace: '/daijiaxuan2026/mori/宣传海报/图片4(1)_compressed'
  }
];

let fixedCount = 0;

searchPatterns.forEach((pattern, idx) => {
  const idxPos = content.indexOf(pattern.search);
  
  if (idxPos !== -1) {
    console.log(`✓ 找到 ${pattern.name} 在位置 ${idxPos}`);
    
    const before = content.substring(0, idxPos);
    const after = content.substring(idxPos);
    
    const newAfter = pattern.replace + after.substring(pattern.search.length);
    content = before + newAfter;
    
    console.log(`  → 已添加 /daijiaxuan2026/ 前缀\n`);
    fixedCount++;
  } else {
    console.log(`✗ 未找到 ${pattern.name}\n`);
  }
});

if (fixedCount > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`=== 修复完成！共修复 ${fixedCount} 个路径 ===`);
} else {
  console.log('=== 没有需要修复的路径 ===');
}
