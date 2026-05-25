const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
const content = fs.readFileSync(filePath, 'utf8');

console.log('搜索宣传海报目录下的图片...\n');

const searchStr = 'compressed.jpg';
let idx = content.indexOf(searchStr);

if (idx !== -1) {
  console.log(`找到 "compressed.jpg" 在位置 ${idx}`);
  
  const start = Math.max(0, idx - 600);
  const end = Math.min(content.length, idx + searchStr.length + 5);
  const snippet = content.substring(start, end);
  
  console.log('\n找到的数组片段:');
  console.log(snippet);
  
  let fixedContent = content;
  
  const patterns = [
    { search: '鍥剧墖1(1)_compressed', replace: '/daijiaxuan2026/mori/宣传海报/图片1(1)_compressed' },
    { search: '鍥剧墖2(1)_compressed', replace: '/daijiaxuan2026/mori/宣传海报/图片2(1)_compressed' },
    { search: '鍥剧墖3(1)_compressed', replace: '/daijiaxuan2026/mori/宣传海报/图片3(1)_compressed' },
    { search: '鍥剧墖4(1)_compressed', replace: '/daijiaxuan2026/mori/宣传海报/图片4(1)_compressed' },
  ];
  
  patterns.forEach(p => {
    const pos = fixedContent.indexOf(p.search);
    if (pos !== -1) {
      console.log(`\n修复: ${p.search}`);
      const before = fixedContent.substring(0, pos);
      const after = fixedContent.substring(pos + p.search.length);
      fixedContent = before + p.replace + after;
      console.log(`✓ 已修复`);
    }
  });
  
  fs.writeFileSync(filePath, fixedContent, 'utf8');
  console.log('\n=== 文件已更新 ===');
}
