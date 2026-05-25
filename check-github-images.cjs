const https = require('https');
const http = require('http');

function checkUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      resolve({ url, status: res.statusCode, exists: res.statusCode === 200 });
    }).on('error', () => {
      resolve({ url, status: 'error', exists: false });
    });
  });
}

async function checkImages() {
  console.log('=== 检查 GitHub 上的图片文件 ===\n');
  
  const images = [
    'https://xiaozhi143.github.io/daijiaxuan2026/car/0.png',
    'https://xiaozhi143.github.io/daijiaxuan2026/car/1.png',
    'https://xiaozhi143.github.io/daijiaxuan2026/car/2.png',
    'https://xiaozhi143.github.io/daijiaxuan2026/car/3.mp4',
    'https://xiaozhi143.github.io/daijiaxuan2026/kid/0.png',
    'https://xiaozhi143.github.io/daijiaxuan2026/kid/1.png',
    'https://xiaozhi143.github.io/daijiaxuan2026/kid/2.png',
    'https://xiaozhi143.github.io/daijiaxuan2026/kid/3.png',
    'https://xiaozhi143.github.io/daijiaxuan2026/kid/4.png',
    'https://xiaozhi143.github.io/daijiaxuan2026/kid/5.png',
    'https://xiaozhi143.github.io/daijiaxuan2026/kid/6.png',
    'https://xiaozhi143.github.io/daijiaxuan2026/mf/1.jpg',
    'https://xiaozhi143.github.io/daijiaxuan2026/mf/2.jpg',
    'https://xiaozhi143.github.io/daijiaxuan2026/eater/0.jpg',
    'https://xiaozhi143.github.io/daijiaxuan2026/mori/01.png',
    'https://xiaozhi143.github.io/daijiaxuan2026/mori/13.jpg',
    'https://xiaozhi143.github.io/daijiaxuan2026/xiang/0.jpg',
    'https://xiaozhi143.github.io/daijiaxuan2026/photo.png',
  ];
  
  let exists = 0;
  let missing = 0;
  
  for (const url of images) {
    const result = await checkUrl(url);
    const filename = url.split('/').pop();
    
    if (result.exists) {
      exists++;
      console.log(`✓ ${filename}`);
    } else {
      missing++;
      console.log(`✗ ${filename} - ${result.status}`);
    }
  }
  
  console.log(`\n=== 检查结果 ===`);
  console.log(`存在: ${exists} 个`);
  console.log(`缺失: ${missing} 个`);
}

checkImages();
