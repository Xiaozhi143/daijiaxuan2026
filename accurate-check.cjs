const fs = require('fs');

const content = fs.readFileSync('c:/git/daijiaxuan2026/assets/index-DdDxdCM7.js', 'utf8');

console.log('=== 详细检查路径格式 ===\n');

// 查找所有图片路径
const imagePattern = /"\/[^"]+\.(png|jpg|mp4|jpeg)"/g;
const matches = content.match(imagePattern) || [];

console.log(`找到 ${matches.length} 个图片路径\n`);

// 检查是否有不正确的路径（没有 /daijiaxuan2026/ 前缀的）
const incorrectPaths = matches.filter(path => {
  // 排除外部URL（如阿里云链接）
  if (path.includes('https://') || path.includes('http://')) {
    return false;
  }
  // 检查是否缺少 /daijiaxuan2026/ 前缀
  return !path.includes('/daijiaxuan2026/');
});

if (incorrectPaths.length > 0) {
  console.log('✗ 发现缺少前缀的路径:');
  incorrectPaths.forEach(p => console.log(`  ${p}`));
} else {
  console.log('✓ 所有路径都包含正确的 /daijiaxuan2026/ 前缀');
}

// 检查几个关键的路径
console.log('\n检查关键路径:');
const keyPaths = [
  '/daijiaxuan2026/mori/cj/图片1.png',
  '/daijiaxuan2026/mori/宣传海报/图片1(1)_compressed.jpg',
  '/daijiaxuan2026/xiang/0.jpg',
  '/daijiaxuan2026/xiang/总海报.jpg'
];

keyPaths.forEach(path => {
  const exists = content.includes(path);
  console.log(`${exists ? '✓' : '✗'} ${path}`);
});
