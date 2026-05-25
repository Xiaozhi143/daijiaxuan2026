const fs = require('fs');

const content = fs.readFileSync('C:/Users/22670/Desktop/wz4/dist/assets/index-DSjsRPsc.js', 'utf8');

const regex = /\"(?<path>[^\"]*(?:\.png|\.jpg|\.mp4|\.svg|\.webp)(?:\?[^\"]*)?)\"/g;
const allPaths = [];
let match;

while ((match = regex.exec(content)) !== null) {
  const path = match.groups.path;
  allPaths.push({
    path,
    hasPrefix: path.startsWith('/daijiaxuan2026/'),
    isExternal: path.startsWith('http')
  });
}

const grouped = {
  correct: allPaths.filter(p => p.hasPrefix || p.isExternal),
  missing: allPaths.filter(p => !p.hasPrefix && !p.isExternal)
};

console.log('=== 新构建文件的路径分析 ===');
console.log(`总计路径数: ${allPaths.length}`);
console.log(`正确路径 (有前缀或外部): ${grouped.correct.length}`);
console.log(`缺少前缀的路径: ${grouped.missing.length}\n`);

if (grouped.missing.length > 0) {
  console.log('缺少前缀的路径:');
  grouped.missing.forEach(p => console.log(`  - ${p.path}`));
}

if (grouped.correct.length > 0) {
  console.log('\n前5个正确路径:');
  grouped.correct.slice(0, 5).forEach(p => console.log(`  ✓ ${p.path}`));
}
