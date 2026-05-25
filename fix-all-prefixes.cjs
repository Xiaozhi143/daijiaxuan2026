const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('=== 修复所有缺少 /daijiaxuan2026/ 前缀的路径 ===\n');

const replacements = [
  { from: '"/car/', to: '"/daijiaxuan2026/car/' },
  { from: '"/kid/', to: '"/daijiaxuan2026/kid/' },
  { from: '"/mf/', to: '"/daijiaxuan2026/mf/' },
  { from: '"/eater/', to: '"/daijiaxuan2026/eater/' },
  { from: '"/mori/', to: '"/daijiaxuan2026/mori/' },
  { from: '"/xiang/', to: '"/daijiaxuan2026/xiang/' },
  { from: '"/photo.', to: '"/daijiaxuan2026/photo.' },
];

let fixed = 0;

replacements.forEach(r => {
  const count = (content.match(new RegExp(r.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  
  if (count > 0) {
    content = content.replace(new RegExp(r.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), r.to);
    console.log(`✓ 修复 ${count} 个: ${r.from} -> ${r.to}`);
    fixed += count;
  }
});

if (fixed > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\n=== 成功修复 ${fixed} 个路径 ===`);
} else {
  console.log('没有找到需要修复的路径');
}
