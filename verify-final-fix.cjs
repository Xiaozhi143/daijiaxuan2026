const fs = require('fs');

const files = fs.readdirSync('c:/git/daijiaxuan2026/assets');
const jsFiles = files.filter(f => f.startsWith('index-') && f.endsWith('.js'));

console.log(`JS 文件: ${jsFiles[0]}\n`);

const content = fs.readFileSync(`c:/git/daijiaxuan2026/assets/${jsFiles[0]}`, 'utf8');

// 检查关键路径
const checks = [
  '/daijiaxuan2026/mori/cj/图片1.png',
  '/daijiaxuan2026/mori/宣传海报/图片1(1)_compressed.jpg',
  '/daijiaxuan2026/xiang/0.jpg',
  '/daijiaxuan2026/xiang/总海报.jpg'
];

console.log('检查关键路径：\n');
checks.forEach(path => {
  const exists = content.includes(path);
  console.log(`${exists ? '✓' : '✗'} ${path}`);
});

// 检查是否有缺少前缀的路径
console.log('\n检查是否有缺少前缀的路径：');
const missingPrefix = [
  '"\\/mori/cj/',
  '"\\/xiang/',
  '"\\/mori/宣传海报/'
];

missingPrefix.forEach(pattern => {
  const count = (content.match(new RegExp(pattern, 'g')) || []).length;
  console.log(`${count === 0 ? '✓' : '✗'} ${pattern}: ${count} 个`);
});
