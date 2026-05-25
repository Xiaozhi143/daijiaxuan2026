const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-Dg371ZVu.js';
const content = fs.readFileSync(filePath, 'utf8');

console.log('=== 验证新构建的 JS 文件 ===\n');

// 检查正确的路径前缀
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
const photoDouble = (content.match(/"\/daijiaxuan2026\/daijiaxuan2026\/photo\./g) || []).length;
console.log('photo.:');
console.log(`  正确前缀: ${photoWith} 个`);
console.log(`  双重前缀: ${photoDouble} 个`);
