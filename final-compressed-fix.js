const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
const buffer = fs.readFileSync(filePath);

console.log('=== 精确修复宣传海报目录下的图片 ===\n');

const search = Buffer.from('compressed.jpg');
let idx = buffer.indexOf(search);

if (idx !== -1) {
  console.log(`找到 "compressed.jpg" 在字节位置 ${idx}`);
  
  const segment = buffer.slice(idx - 600, idx + 20);
  const segmentStr = segment.toString('utf8');
  
  console.log('\n原始片段:');
  console.log(segmentStr);
  
  let fixedBuffer = buffer;
  let fixed = 0;
  
  const searchTerms = [
    { from: '鍥剧墖1(1)_compressed', to: '/daijiaxuan2026/mori/宣传海报/图片1(1)_compressed' },
    { from: '鍥剧墖2(1)_compressed', to: '/daijiaxuan2026/mori/宣传海报/图片2(1)_compressed' },
    { from: '鍥剧墖3(1)_compressed', to: '/daijiaxuan2026/mori/宣传海报/图片3(1)_compressed' },
    { from: '鍥剧墖4(1)_compressed', to: '/daijiaxuan2026/mori/宣传海报/图片4(1)_compressed' }
  ];
  
  searchTerms.forEach(term => {
    const fromBuffer = Buffer.from(term.from);
    const idxPos = fixedBuffer.indexOf(fromBuffer);
    
    if (idxPos !== -1) {
      console.log(`\n✓ 找到: ${term.from} 在位置 ${idxPos}`);
      
      const toBuffer = Buffer.from(term.to);
      const before = fixedBuffer.slice(0, idxPos);
      const after = fixedBuffer.slice(idxPos + fromBuffer.length);
      fixedBuffer = Buffer.concat([before, toBuffer, after]);
      
      console.log(`  替换为: ${term.to}`);
      fixed++;
    } else {
      console.log(`\n✗ 未找到: ${term.from}`);
    }
  });
  
  if (fixed > 0) {
    fs.writeFileSync(filePath, fixedBuffer);
    console.log(`\n=== 成功修复 ${fixed} 个路径 ===`);
    console.log('文件已更新！');
  } else {
    console.log('\n没有找到需要修复的路径');
  }
}
