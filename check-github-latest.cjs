const https = require('https');
const http = require('http');
const fs = require('fs');

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

async function checkGitHub() {
  console.log('=== 检查 GitHub 上部署的 JS 文件 ===\n');
  
  try {
    // 获取最新的 JS 文件名
    const indexHtml = await fetchUrl('https://xiaozhi143.github.io/daijiaxuan2026/index.html');
    const htmlContent = indexHtml.toString('utf8');
    
    // 提取 JS 文件名
    const jsMatch = htmlContent.match(/assets\/(index-[^"]+\.js)/);
    if (!jsMatch) {
      console.log('无法找到 JS 文件引用');
      return;
    }
    
    const jsFileName = jsMatch[1];
    console.log(`JS 文件: ${jsFileName}\n`);
    
    // 下载 JS 文件
    const jsUrl = `https://xiaozhi143.github.io/daijiaxuan2026/assets/${jsFileName}`;
    const jsContent = await fetchUrl(jsUrl);
    const jsText = jsContent.toString('utf8');
    
    console.log(`JS 文件大小: ${(jsContent.length / 1024).toFixed(2)} KB\n`);
    
    // 检查关键路径
    const checkPaths = [
      { pattern: '/daijiaxuan2026/car/0.png', name: 'car/0.png' },
      { pattern: '/daijiaxuan2026/kid/0.png', name: 'kid/0.png' },
      { pattern: '/daijiaxuan2026/mf/1.jpg', name: 'mf/1.jpg' },
      { pattern: '/daijiaxuan2026/eater/0.jpg', name: 'eater/0.jpg' },
      { pattern: '/daijiaxuan2026/mori/01.png', name: 'mori/01.png' },
      { pattern: '/daijiaxuan2026/xiang/0.jpg', name: 'xiang/0.jpg' },
    ];
    
    console.log('检查路径前缀:');
    checkPaths.forEach(item => {
      const exists = jsText.includes(item.pattern);
      console.log(`${exists ? '✓' : '✗'} ${item.name}`);
    });
    
    // 保存到本地
    const localPath = 'c:/git/daijiaxuan2026/assets/github-latest.js';
    fs.writeFileSync(localPath, jsContent);
    console.log(`\n✓ 已保存到本地: ${localPath}`);
    
  } catch (error) {
    console.error('错误:', error.message);
  }
}

checkGitHub();
