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

async function checkJSFile() {
  console.log('=== 检查 GitHub 上部署的 JS 文件 ===\n');
  
  try {
    // 获取 index.html
    const html = await fetchUrl('https://xiaozhi143.github.io/daijiaxuan2026/index.html');
    const htmlText = html.toString('utf8');
    
    // 提取 JS 文件名
    const jsMatch = htmlText.match(/assets\/(index-[^"]+\.js)/);
    if (!jsMatch) {
      console.log('无法找到 JS 文件引用');
      return;
    }
    
    const jsFileName = jsMatch[1];
    console.log(`JS 文件: ${jsFileName}\n`);
    
    // 下载 JS 文件
    const jsUrl = `https://xiaozhi143.github.io/daijiaxuan2026/assets/${jsFileName}`;
    const js = await fetchUrl(jsUrl);
    const jsText = js.toString('utf8');
    
    // 检查各个文件夹的路径
    const folders = ['car', 'kid', 'mf', 'eater', 'mori', 'xiang'];
    
    console.log('检查各文件夹的路径格式:\n');
    
    folders.forEach(folder => {
      const withPrefix = (jsText.match(new RegExp(`"/daijiaxuan2026/${folder}/`, 'g')) || []).length;
      const withoutPrefix = (jsText.match(new RegExp(`"/${folder}/`, 'g')) || []).length;
      
      console.log(`${folder}/:`);
      console.log(`  有 /daijiaxuan2026/ 前缀: ${withPrefix} 个`);
      console.log(`  无前缀: ${withoutPrefix} 个`);
      
      if (withoutPrefix > 0) {
        console.log(`  ⚠️ 警告: 有 ${withoutPrefix} 个路径缺少前缀!`);
        
        // 找到示例
        const idx = jsText.indexOf(`"/${folder}/`);
        if (idx !== -1) {
          const snippet = jsText.substring(idx, idx + 60);
          console.log(`  示例: ${snippet}`);
        }
      }
      console.log();
    });
    
    // 检查 photo
    const photoWith = (jsText.match(/"\/daijiaxuan2026\/photo\./g) || []).length;
    const photoWithout = (jsText.match(/"\/photo\./g) || []).length;
    console.log('photo.:');
    console.log(`  有 /daijiaxuan2026/ 前缀: ${photoWith} 个`);
    console.log(`  无前缀: ${photoWithout} 个`);
    
  } catch (error) {
    console.error('错误:', error.message);
  }
}

checkJSFile();
