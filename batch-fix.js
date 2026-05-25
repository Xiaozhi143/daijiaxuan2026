const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('=== 批量修复所有缺少前缀的路径 ===\n');

const fixes = [
  { from: '"/photo.png"', to: '"/daijiaxuan2026/photo.png"' },
  { from: '"/mori/123456.mp4"', to: '"/daijiaxuan2026/mori/123456.mp4"' },
  { from: '"/kid/0.png"', to: '"/daijiaxuan2026/kid/0.png"' },
  { from: '"/kid/1.png"', to: '"/daijiaxuan2026/kid/1.png"' },
  { from: '"/kid/2.png"', to: '"/daijiaxuan2026/kid/2.png"' },
  { from: '"/kid/3.png"', to: '"/daijiaxuan2026/kid/3.png"' },
  { from: '"/kid/4.png"', to: '"/daijiaxuan2026/kid/4.png"' },
  { from: '"/kid/5.png"', to: '"/daijiaxuan2026/kid/5.png"' },
  { from: '"/kid/6.png"', to: '"/daijiaxuan2026/kid/6.png"' },
  { from: '"/car/0.png"', to: '"/daijiaxuan2026/car/0.png"' },
  { from: '"/car/3.mp4"', to: '"/daijiaxuan2026/car/3.mp4"' },
  { from: '"/car/2.png"', to: '"/daijiaxuan2026/car/2.png"' },
  { from: '"/car/1.png"', to: '"/daijiaxuan2026/car/1.png"' },
  { from: '"/mf/1.jpg"', to: '"/daijiaxuan2026/mf/1.jpg"' },
  { from: '"/mf/2.jpg"', to: '"/daijiaxuan2026/mf/2.jpg"' },
  { from: '"/mf/055f5d9c591bab5339847a73f3bbdf3.jpg"', to: '"/daijiaxuan2026/mf/055f5d9c591bab5339847a73f3bbdf3.jpg"' },
  { from: '"/mf/79c28d881b15cb04c25d2eff5b65fee.png"', to: '"/daijiaxuan2026/mf/79c28d881b15cb04c25d2eff5b65fee.png"' },
  { from: '"/eater/0.jpg"', to: '"/daijiaxuan2026/eater/0.jpg"' },
  { from: '"/eater/1.png"', to: '"/daijiaxuan2026/eater/1.png"' },
  { from: '"/eater/2.png"', to: '"/daijiaxuan2026/eater/2.png"' },
  { from: '"/eater/4.png"', to: '"/daijiaxuan2026/eater/4.png"' },
  { from: '"/mori/01.png"', to: '"/daijiaxuan2026/mori/01.png"' },
  { from: '"/mori/13.jpg"', to: '"/daijiaxuan2026/mori/13.jpg"' },
  { from: '"/mori/14.jpg"', to: '"/daijiaxuan2026/mori/14.jpg"' },
  { from: '"/mori/图片7.png"', to: '"/daijiaxuan2026/mori/图片7.png"' },
  { from: '"/mori/图片8.png"', to: '"/daijiaxuan2026/mori/图片8.png"' },
  { from: '"/mori/图片9.png"', to: '"/daijiaxuan2026/mori/图片9.png"' },
  { from: '"/mori/图片10.png"', to: '"/daijiaxuan2026/mori/图片10.png"' },
  { from: '"/xiang/', to: '"/daijiaxuan2026/xiang/' },
];

let fixedCount = 0;

fixes.forEach(fix => {
  const count = (content.match(new RegExp(fix.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  
  if (count > 0) {
    content = content.replace(new RegExp(fix.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), fix.to);
    console.log(`✓ 修复 ${count} 个: ${fix.from}`);
    fixedCount += count;
  }
});

if (fixedCount > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\n=== 成功修复 ${fixedCount} 个路径 ===`);
} else {
  console.log('\n没有找到需要修复的路径');
}
