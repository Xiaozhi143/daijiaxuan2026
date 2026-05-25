const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
let content = fs.readFileSync(filePath);

console.log('使用字节级搜索...\n');

const searchBytes = Buffer.from('compressed.jpg');
let idx = content.indexOf(searchBytes);

if (idx !== -1) {
  console.log(`找到 "compressed.jpg" 在字节位置 ${idx}`);
  
  const start = Math.max(0, idx - 600);
  const end = Math.min(content.length, idx + searchBytes.length + 5);
  const snippet = content.slice(start, end);
  
  const snippetStr = snippet.toString('utf8');
  console.log('\n片段 (前200字符):');
  console.log(snippetStr.substring(0, 200));
  
  let fixedContent = content;
  
  const replacements = [
    { search: '鍥剧墖1(1)_compressed', replace: '/daijiaxuan2026/mori/宣传海报/图片1(1)_compressed' },
    { search: '鍥剧墖2(1)_compressed', replace: '/daijiaxuan2026/mori/宣传海报/图片2(1)_compressed' },
    { search: '鍥剧墖3(1)_compressed', replace: '/daijiaxuan2026/mori/宣传海报/图片3(1)_compressed' },
    { search: '鍥剧墖4(1)_compressed', replace: '/daijiaxuan2026/mori/宣传海报/图片4(1)_compressed' },
  ];
  
  replacements.forEach(r => {
    const searchBuf = Buffer.from(r.search);
    const replaceBuf = Buffer.from(r.replace);
    
    let pos = fixedContent.indexOf(searchBuf);
    if (pos !== -1) {
      console.log(`\n找到 ${r.search} 在位置 ${pos}`);
      
      const before = fixedContent.slice(0, pos);
      const after = fixedContent.slice(pos + searchBuf.length);
      fixedContent = Buffer.concat([before, replaceBuf, after]);
      
      console.log(`✓ 已替换为 ${r.replace}`);
    }
  });
  
  fs.writeFileSync(filePath, fixedContent);
  console.log('\n=== 文件已更新 ===');
} else {
  console.log('未找到 "compressed.jpg"');
}
