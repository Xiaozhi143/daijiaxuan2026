const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
let content = fs.readFileSync(filePath);

console.log('提取并替换宣传海报路径...\n');

const search = Buffer.from('compressed.jpg');
let idx = content.indexOf(search);

if (idx !== -1) {
  console.log(`找到 "compressed.jpg" 在字节位置 ${idx}`);
  
  const start = idx - 500;
  const end = idx + search.length;
  const snippet = content.slice(start, end);
  
  console.log('找到的片段:');
  console.log(snippet.toString('utf8'));
  
  const textDecoder = new TextDecoder('utf8');
  const contentStr = textDecoder.decode(content);
  
  const beforeSnippet = contentStr.substring(start, idx);
  const afterSnippet = contentStr.substring(idx);
  
  const searchStr = contentStr.substring(idx - 500, idx + 100);
  console.log('\n搜索字符串:');
  console.log(JSON.stringify(searchStr));
  
  const patterns = [
    { search: '鍥剧墖1(1)_compressed', replace: '/daijiaxuan2026/mori/宣传海报/图片1(1)_compressed' },
    { search: '鍥剧墖2(1)_compressed', replace: '/daijiaxuan2026/mori/宣传海报/图片2(1)_compressed' },
    { search: '鍥剧墖3(1)_compressed', replace: '/daijiaxuan2026/mori/宣传海报/图片3(1)_compressed' },
    { search: '鍥剧墖4(1)_compressed', replace: '/daijiaxuan2026/mori/宣传海报/图片4(1)_compressed' },
  ];
  
  let newContentStr = contentStr;
  
  patterns.forEach(p => {
    if (newContentStr.includes(p.search)) {
      newContentStr = newContentStr.replace(p.search, p.replace);
      console.log(`✓ 替换: ${p.search} -> ${p.replace}`);
    } else {
      console.log(`✗ 未找到: ${p.search}`);
    }
  });
  
  fs.writeFileSync(filePath, newContentStr);
  console.log('\n=== 文件已更新 ===');
}
