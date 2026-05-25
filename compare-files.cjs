const fs = require('fs');
const https = require('https');
const http = require('http');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function compareFiles() {
  console.log('=== 比较本地和 GitHub 上的 JS 文件 ===\n');
  
  try {
    // 读取本地文件
    const localPath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
    const localContent = fs.readFileSync(localPath);
    
    // 下载 GitHub 上的文件
    const githubUrl = 'https://xiaozhi143.github.io/daijiaxuan2026/assets/index-B5ugdZHh.js';
    const githubContent = await fetchUrl(githubUrl);
    
    console.log(`本地文件大小: ${(localContent.length / 1024).toFixed(2)} KB`);
    console.log(`GitHub 文件大小: ${(githubContent.length / 1024).toFixed(2)} KB`);
    
    if (localContent.equals(githubContent)) {
      console.log('\n✓ 文件完全一致');
    } else {
      console.log('\n✗ 文件不一致！可能需要重新上传');
      
      // 比较关键部分
      const localText = localContent.toString('utf8');
      const githubText = githubContent.toString('utf8');
      
      console.log('\n检查关键路径：');
      const paths = ['/daijiaxuan2026/car/0.png', '/daijiaxuan2026/kid/0.png'];
      
      paths.forEach(path => {
        const localHas = localText.includes(path);
        const githubHas = githubText.includes(path);
        console.log(`${path}:`);
        console.log(`  本地: ${localHas ? '✓' : '✗'}`);
        console.log(`  GitHub: ${githubHas ? '✓' : '✗'}`);
      });
    }
    
  } catch (error) {
    console.error('错误:', error.message);
  }
}

compareFiles();
