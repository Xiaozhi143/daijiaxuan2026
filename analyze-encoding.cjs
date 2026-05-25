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
    
    // 查找鍥剧墖12.png的实际编码
    const idx1 = content.indexOf('鍥剧墖12.png');
    if (idx1 !== -1) {
      console.log('找到 "鍥剧墖12.png" 在位置:', idx1);
      const start = Math.max(0, idx1 - 30);
      const snippet = content.substring(start, idx1 + 30);
      console.log('上下文:', snippet);
      
      // 获取实际字节
      const bytes = Buffer.from(snippet, 'utf8');
      console.log('实际字节:', bytes.slice(0, 50).toString('hex'));
    }
    
    // 查找正确的"图片12"
    const correct = '图片12.png';
    const idx2 = content.indexOf(correct);
    console.log('\n搜索正确的中文 "图片12.png":', idx2 !== -1 ? '找到' : '未找到');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkJSFile();
