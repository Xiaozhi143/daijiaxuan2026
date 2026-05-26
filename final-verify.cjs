const fs = require('fs');

const files = fs.readdirSync('c:/git/daijiaxuan2026/assets');
const jsFiles = files.filter(f => f.startsWith('index-') && f.endsWith('.js'));

const content = fs.readFileSync(`c:/git/daijiaxuan2026/assets/${jsFiles[0]}`, 'utf8');

console.log(`=== 检查 ${jsFiles[0]} ===\n`);

// 查找所有图片路径
const imagePattern = /"\/[^"]+\.(png|jpg|mp4|jpeg)"/g;
const matches = content.match(imagePattern) || [];

console.log(`找到 ${matches.length} 个图片路径\n`);

// 检查是否有不正确的路径（没有 /daijiaxuan2026/ 前缀的）
const incorrectPaths = matches.filter(path => {
  if (path.includes('https://') || path.includes('http://')) {
    return false;
  }
  return !path.includes('/daijiaxuan2026/');
});

if (incorrectPaths.length > 0) {
  console.log(`✗ 发现 ${incorrectPaths.length} 个缺少前缀的路径`);
  incorrectPaths.slice(0, 5).forEach(p => console.log(`  ${p}`));
} else {
  console.log('✓ 所有路径都包含正确的 /daijiaxuan2026/ 前缀');
}

// 检查几个关键的路径
console.log('\n检查关键路径:');
const keyPaths = [
  '/daijiaxuan2026/mori/cj/图片1.png',
  '/daijiaxuan2026/mori/宣传海报/图片1(1)_compressed.jpg',
  '/daijiaxuan2026/xiang/0.jpg',
  '/daijiaxuan2026/xiang/总海报.jpg',
  '/daijiaxuan2026/kid/0.png',
  '/daijiaxuan2026/car/0.png'
];

keyPaths.forEach(path => {
  const exists = content.includes(path);
  console.log(`${exists ? '✓' : '✗'} ${path}`);
});

// 检查是否有"查看完整内容"
console.log('\n检查"查看完整内容":');
const hasExpand = content.includes('查看完整内容');
console.log(`${hasExpand ? '✗ 存在' : '✓ 已删除'}`);
