const https = require('https');
const fs = require('fs');

const url = 'https://xiaozhi143.github.io/daijiaxuan2026/assets/index-B5ugdZHh.js';
const outputPath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh-github.js';

console.log('=== 从 GitHub 下载 JS 文件 ===\n');

https.get(url, (res) => {
  if (res.statusCode !== 200) {
    console.error('下载失败:', res.statusCode);
    return;
  }
  
  const chunks = [];
  res.on('data', (chunk) => chunks.push(chunk));
  res.on('end', () => {
    const buffer = Buffer.concat(chunks);
    fs.writeFileSync(outputPath, buffer);
    console.log(`✓ 下载成功: ${outputPath}`);
    console.log(`文件大小: ${(buffer.length / 1024).toFixed(2)} KB`);
  });
}).on('error', (err) => {
  console.error('错误:', err.message);
});
