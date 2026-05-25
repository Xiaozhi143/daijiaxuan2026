const https = require('https');
const http = require('http');
const fs = require('fs');

function checkFile(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      resolve({ url: url.split('/').pop(), status: res.statusCode, ok: res.statusCode === 200 });
    }).on('error', () => {
      resolve({ url: url.split('/').pop(), status: 'error', ok: false });
    });
  });
}

async function checkAllImages() {
  console.log('=== 系统检查所有图片文件 ===\n');
  
  const baseUrl = 'https://xiaozhi143.github.io/daijiaxuan2026';
  const localBase = 'c:/git/daijiaxuan2026';
  
  const files = [
    // photo
    'photo.png',
    
    // mori/cj
    'mori/cj/图片1.png',
    'mori/cj/图片2.png',
    'mori/cj/图片3.png',
    'mori/cj/图片4.png',
    'mori/cj/图片5.png',
    'mori/cj/图片6.png',
    'mori/cj/图片7.png',
    'mori/cj/图片8.png',
    'mori/cj/图片9.png',
    
    // mori/宣传海报
    'mori/宣传海报/图片1(1)_compressed.jpg',
    'mori/宣传海报/图片2(1)_compressed.jpg',
    'mori/宣传海报/图片3(1)_compressed.jpg',
    'mori/宣传海报/图片4(1)_compressed.jpg',
    
    // xiang
    'xiang/0.jpg',
    'xiang/1.jpg',
    'xiang/2.jpg',
    'xiang/3.jpg',
    'xiang/4.jpg',
    'xiang/5.jpg',
    'xiang/6.jpg',
    'xiang/7.jpg',
    'xiang/8.jpg',
    'xiang/9.jpg',
    
    // car
    'car/0.png',
    'car/1.png',
    'car/2.png',
    'car/3.mp4',
    
    // kid
    'kid/0.png',
    'kid/1.png',
    'kid/2.png',
    'kid/3.png',
    'kid/4.png',
    'kid/5.png',
    'kid/6.png',
    
    // mf
    'mf/1.jpg',
    'mf/2.jpg',
    'mf/055f5d9c591bab5339847a73f3bbdf3.jpg',
    'mf/79c28d881b15cb04c25d2eff5b65fee.png',
    
    // eater
    'eater/0.jpg',
    'eater/1.png',
    'eater/2.png',
    'eater/3.png',
    'eater/4.png',
  ];
  
  let localExists = 0;
  let localMissing = 0;
  let githubExists = 0;
  let githubMissing = 0;
  
  console.log('检查本地和 GitHub 上的文件:\n');
  
  for (const file of files) {
    // 检查本地
    const localPath = `${localBase}/${file}`;
    const localOk = fs.existsSync(localPath);
    
    // 检查 GitHub
    const url = `${baseUrl}/${file}`;
    const github = await checkFile(url);
    
    if (localOk) localExists++;
    else localMissing++;
    
    if (github.ok) githubExists++;
    else githubMissing++;
    
    const status = localOk && github.ok ? '✓' : localOk && !github.ok ? '⚠️ 本地有' : !localOk && github.ok ? '⚠️ GitHub有' : '✗ 缺失';
    console.log(`${status} ${file}`);
  }
  
  console.log(`\n=== 统计 ===`);
  console.log(`本地存在: ${localExists}/${files.length}`);
  console.log(`GitHub 存在: ${githubExists}/${files.length}`);
}

checkAllImages();
