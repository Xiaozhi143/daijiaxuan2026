const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-Dnl5O9fy.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('=== 修复双重前缀 ===\n');

let count = 0;

content = content.replace(/\/daijiaxuan2026\/daijiaxuan2026\//g, '/daijiaxuan2026/');
console.log('已修复双重前缀');

console.log('\n=== 添加缺失的前缀 ===\n');

const missingFixes = [
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
];

missingFixes.forEach(fix => {
  const regex = new RegExp(fix.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  const matches = content.match(regex);
  
  if (matches) {
    content = content.replace(regex, fix.to);
    console.log(`✓ 修复 ${matches.length} 个: ${fix.from}`);
    count += matches.length;
  }
});

console.log(`\n已修复 ${count} 个路径`);
fs.writeFileSync(filePath, content, 'utf8');
console.log('文件已保存！');
