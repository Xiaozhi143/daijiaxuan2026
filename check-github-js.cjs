const https = require('https');
const http = require('http');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function checkJSFile() {
  const url = 'https://xiaozhi143.github.io/daijiaxuan2026/assets/index-B5ugdZHh.js';
  
  try {
    const content = await fetchUrl(url);
    
    console.log('=== 检查 GitHub 上部署的 JS 文件 ===\n');
    
    // 检查关键路径
    const checkPaths = [
      '/daijiaxuan2026/mori/入口 .png',
      '/daijiaxuan2026/mori/图片12.png',
      '/daijiaxuan2026/mori/01.png',
      '/daijiaxuan2026/xiang/总海报.jpg',
      '/daijiaxuan2026/mori/宣传海报/图片1(1)_compressed.jpg'
    ];
    
    checkPaths.forEach(path => {
      const exists = content.includes(path);
      console.log(`${exists ? '✓' : '✗'} ${path}`);
    });
    
    console.log('\n检查是否有错误的路径:');
    const badPatterns = [
      '鍏ュ彛',
      '鍥剧墖12',
      '鎬绘捣鎶',
      '鍥剧墖'
    ];
    
    badPatterns.forEach(pattern => {
      const exists = content.includes(pattern);
      console.log(`${exists ? '✗ 发现错误' : '✓ 没有错误'}: ${pattern}`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkJSFile();
