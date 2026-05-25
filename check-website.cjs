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

async function checkWebsite() {
  console.log('=== 检查网站结构 ===\n');
  
  try {
    // 获取 index.html
    const html = await fetchUrl('https://xiaozhi143.github.io/daijiaxuan2026/index.html');
    const htmlText = html.toString('utf8');
    
    console.log('index.html 内容：\n');
    console.log(htmlText.substring(0, 2000));
    
  } catch (error) {
    console.error('错误:', error.message);
  }
}

checkWebsite();
