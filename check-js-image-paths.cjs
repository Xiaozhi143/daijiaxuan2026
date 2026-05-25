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

async function checkJSImages() {
  console.log('=== 检查 JS 文件中的图片路径格式 ===\n');
  
  try {
    const js = await fetchUrl('https://xiaozhi143.github.io/daijiaxuan2026/assets/index-B5ugdZHh.js');
    const jsText = js.toString('utf8');
    
    // 查找图片路径
    const imagePattern = /"(https?:\/\/[^"]+\.(?:png|jpg|jpeg|webp|gif))"|"(\/[^"]+\.(?:png|jpg|jpeg|webp|gif))"|'([^']+\.(?:png|jpg|jpeg|webp|gif))'/g;
    
    let match;
    let count = 0;
    
    console.log('JS 文件中的图片路径：\n');
    
    while ((match = imagePattern.exec(jsText)) !== null && count < 20) {
      const path = match[1] || match[2] || match[3];
      if (path) {
        console.log(`${count + 1}. ${path}`);
        count++;
      }
    }
    
    // 检查是否有相对路径（不带 / 前缀的）
    console.log('\n检查是否有相对路径：');
    const relativePattern = /"\/?[a-z]+\/[a-z0-9]+\.(png|jpg|jpeg)"/gi;
    let relMatch;
    let relativeCount = 0;
    
    while ((relMatch = relativePattern.exec(jsText)) !== null) {
      if (!relMatch[0].startsWith('"/daijiaxuan2026')) {
        console.log(`相对路径: ${relMatch[0]}`);
        relativeCount++;
      }
    }
    
    if (relativeCount === 0) {
      console.log('✓ 没有发现相对路径');
    }
    
  } catch (error) {
    console.error('错误:', error.message);
  }
}

checkJSImages();
