const fs = require('fs');

const files = fs.readdirSync('c:/git/daijiaxuan2026/assets');
const jsFiles = files.filter(f => f.startsWith('index-') && f.endsWith('.js') && !f.endsWith('.map') && !f.endsWith('.bak'));

jsFiles.sort();
const latestJS = jsFiles[jsFiles.length - 1];

console.log(`检查文件: ${latestJS}\n`);

const content = fs.readFileSync(`c:/git/daijiaxuan2026/assets/${latestJS}`, 'utf8');

// 检查关键路径
const checkPaths = [
  '/daijiaxuan2026/mori/入口 .png',
  '/daijiaxuan2026/mori/图片12.png',
  '/daijiaxuan2026/mori/01.png',
  '/daijiaxuan2026/xiang/总海报.jpg',
  '/daijiaxuan2026/mori/宣传海报/图片1(1)_compressed.jpg'
];

checkPaths.forEach(path => {
  const exists = content.includes(path);
  console.log(`${exists ? '✓' : '✗'} ${path}`);
});

console.log('\n检查是否有错误的路径:');
const badPatterns = [
  '鍏ュ彛',
  '鍥剧墖12',
  '鎬绘捣鎶'
];

badPatterns.forEach(pattern => {
  const exists = content.includes(pattern);
  console.log(`${exists ? '✗ 发现错误' : '✓ 没有错误'}: ${pattern}`);
});
