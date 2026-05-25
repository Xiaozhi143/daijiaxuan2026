const fs = require('fs');

const githubDir = 'c:/git/daijiaxuan2026/assets';

// 找到最新的 JS 文件
const files = fs.readdirSync(githubDir);
const jsFiles = files.filter(f => f.startsWith('index-') && f.endsWith('.js') && !f.endsWith('.map'));

console.log('找到的 JS 文件:');
jsFiles.forEach(f => console.log(`  - ${f}`));

const latestJS = jsFiles[0];
console.log(`\n检查文件: ${latestJS}\n`);

const content = fs.readFileSync(`${githubDir}/${latestJS}`, 'utf8');

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

console.log('=== 路径分析 ===');
console.log(`总计路径数: ${allPaths.length}`);
console.log(`正确路径 (有前缀或外部): ${grouped.correct.length}`);
console.log(`缺少前缀的路径: ${grouped.missing.length}\n`);

if (grouped.missing.length > 0) {
  console.log('缺少前缀的路径:');
  grouped.missing.forEach(p => console.log(`  - ${p.path}`));
}

if (grouped.correct.length > 0) {
  console.log('\n前10个正确路径:');
  grouped.correct.slice(0, 10).forEach(p => console.log(`  ✓ ${p.path}`));
}
