const fs = require('fs');

const content = fs.readFileSync('c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js', 'utf8');

console.log('=== 验证所有路径是否都有 /daijiaxuan2026/ 前缀 ===\n');

const folders = ['car', 'kid', 'mf', 'eater', 'mori', 'xiang'];

folders.forEach(folder => {
  const withPrefix = (content.match(new RegExp(`"/daijiaxuan2026/${folder}/`, 'g')) || []).length;
  const withoutPrefix = (content.match(new RegExp(`"/${folder}/`, 'g')) || []).length;
  
  console.log(`${folder}/:`);
  console.log(`  有前缀: ${withPrefix} 个`);
  console.log(`  无前缀: ${withoutPrefix} 个`);
  console.log();
});

// 检查 photo
const photoWith = (content.match(/"\/daijiaxuan2026\/photo\./g) || []).length;
const photoWithout = (content.match(/"\/photo\./g) || []).length;
console.log('photo.:');
console.log(`  有前缀: ${photoWith} 个`);
console.log(`  无前缀: ${photoWithout} 个`);
