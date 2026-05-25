const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`源目录不存在: ${src}`);
    return;
  }
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const distDir = 'C:/Users/22670/Desktop/wz4/dist';
const githubDir = 'c:/git/daijiaxuan2026';

console.log('=== 复制构建文件到 github 仓库 ===\n');

console.log('复制 dist 目录到 github 仓库...\n');
copyDir(distDir, githubDir);

console.log('✓ 复制完成！');
console.log('\n现在 github 仓库应该包含所有修复后的文件。');
