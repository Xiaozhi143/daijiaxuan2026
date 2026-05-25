const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('=== 最终修复所有剩余路径 ===\n');

const replacements = [
  {
    from: '瀹ｄ紶娴锋姤/鍥剧墖1(1)_compressed.jpg',
    to: '/daijiaxuan2026/mori/宣传海报/图片1(1)_compressed.jpg'
  },
  {
    from: '瀹ｄ紶娴锋姤/鍥剧墖2(1)_compressed.jpg',
    to: '/daijiaxuan2026/mori/宣传海报/图片2(1)_compressed.jpg'
  },
  {
    from: '瀹ｄ紶娴锋姤/鍥剧墖3(1)_compressed.jpg',
    to: '/daijiaxuan2026/mori/宣传海报/图片3(1)_compressed.jpg'
  },
  {
    from: '瀹ｄ紶娴锋姤/鍥剧墖4(1)_compressed.jpg',
    to: '/daijiaxuan2026/mori/宣传海报/图片4(1)_compressed.jpg'
  }
];

let fixedCount = 0;

replacements.forEach(r => {
  const count = (content.match(new RegExp(r.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  
  if (count > 0) {
    content = content.replace(new RegExp(r.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), r.to);
    console.log(`✓ 修复 ${count} 个: ${r.from}`);
    fixedCount += count;
  } else {
    console.log(`✗ 未找到: ${r.from}`);
  }
});

if (fixedCount > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\n=== 成功修复 ${fixedCount} 个路径 ===`);
  console.log('文件已更新！');
} else {
  console.log('\n没有找到需要修复的路径');
}
