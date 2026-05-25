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

async function checkJSContent() {
  console.log('=== 检查 GitHub 上 JS 文件中的图片路径 ===\n');
  
  try {
    const jsUrl = 'https://xiaozhi143.github.io/daijiaxuan2026/assets/index-B5ugdZHh.js';
    const js = await fetchUrl(jsUrl);
    const jsText = js.toString('utf8');
    
    // 检查关键图片路径
    const checkPaths = [
      '/daijiaxuan2026/photo.png',
      '/daijiaxuan2026/car/0.png',
      '/daijiaxuan2026/kid/0.png',
      '/daijiaxuan2026/mf/1.jpg',
      '/daijiaxuan2026/eater/0.jpg',
      '/daijiaxuan2026/mori/01.png',
      '/daijiaxuan2026/xiang/0.jpg',
    ];
    
    checkPaths.forEach(path => {
      const exists = jsText.includes(path);
      console.log(`${exists ? '✓' : '✗'} ${path}`);
    });
    
    // 检查是否有错误的路径（没有前缀的）
    console.log('\n检查是否有缺少前缀的错误路径：');
    const badPatterns = ['"/car/', '"/kid/', '"/mf/', '"/eater/', '"/mori/', '"/xiang/'];
    badPatterns.forEach(pattern => {
      const count = (jsText.match(new RegExp(pattern, 'g')) || []).length;
      if (count > 0) {
        console.log(`✗ 发现 ${count} 个缺少 /daijiaxuan2026/ 前缀的路径: ${pattern}`);
      } else {
        console.log(`✓ ${pattern} 全部正确`);
      }
    });
    
  } catch (error) {
    console.error('错误:', error.message);
  }
}

checkJSContent();
