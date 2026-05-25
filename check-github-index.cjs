const https = require('https');
const http = require('http');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function checkIndexHtml() {
  console.log('=== 检查 GitHub 上部署的 index.html ===\n');
  
  try {
    const html = await fetchUrl('https://xiaozhi143.github.io/daijiaxuan2026/index.html');
    const htmlText = html.toString('utf8');
    
    console.log('index.html 内容：\n');
    console.log(htmlText);
    
    // 提取 JS 文件名
    const jsMatch = htmlText.match(/assets\/(index-[^"]+\.js)/);
    if (jsMatch) {
      console.log(`\n引用的 JS 文件: ${jsMatch[1]}`);
    }
    
  } catch (error) {
    console.error('错误:', error.message);
  }
}

checkIndexHtml();
