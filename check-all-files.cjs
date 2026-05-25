const fs = require('fs');
const path = require('path');

function getAllFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      getAllFiles(fullPath, files);
    } else {
      const stats = fs.statSync(fullPath);
      files.push({
        path: fullPath,
        size: stats.size,
        sizeMB: (stats.size / 1024 / 1024).toFixed(2)
      });
    }
  }
  
  return files;
}

const files = getAllFiles('c:/git/daijiaxuan2026');

console.log('=== 检查所有文件大小 ===\n');

const largeFiles = files.filter(f => f.size > 100 * 1024 * 1024);
const videoFiles = files.filter(f => f.path.match(/\.(mp4|webm|mov)$/i));

console.log(`总文件数: ${files.length}\n`);

if (largeFiles.length > 0) {
  console.log('⚠️ 超过 100MB 的文件:');
  largeFiles.forEach(f => {
    console.log(`  ${f.path} - ${f.sizeMB} MB`);
  });
} else {
  console.log('✓ 没有超过 100MB 的文件\n');
}

console.log('视频文件列表:');
videoFiles.forEach(f => {
  console.log(`  ${f.path} - ${f.sizeMB} MB`);
});

console.log('\n总大小统计:');
const totalSize = files.reduce((sum, f) => sum + f.size, 0);
console.log(`所有文件总大小: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
