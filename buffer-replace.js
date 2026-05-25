const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
const buffer = fs.readFileSync(filePath);

console.log('字节级别精确替换...\n');

const search = Buffer.from('compressed.jpg');
let idx = buffer.indexOf(search);

if (idx !== -1) {
  console.log(`找到 "compressed.jpg" 在字节位置 ${idx}`);
  
  const start = idx - 500;
  const segment = buffer.slice(start, idx + 30);
  
  console.log('\n片段 (前100字节):');
  console.log(segment.slice(0, 100).toString('utf8'));
  
  const segmentStr = segment.toString('utf8');
  
  const oldParts = [
    '鍥剧墖1(1)_compressed',
    '鍥剧墖2(1)_compressed',
    '鍥剧墖3(1)_compressed',
    '鍥剧墖4(1)_compressed'
  ];
  
  let newBuffer = buffer;
  
  oldParts.forEach(part => {
    const partBuffer = Buffer.from(part);
    const partIdx = segment.indexOf(part);
    
    if (partIdx !== -1) {
      console.log(`\n找到 "${part}"`);
      
      const globalIdx = start + partIdx;
      
      const replacePart = part.replace('鍥剧墖', '/daijiaxuan2026/mori/宣传海报/图片');
      const replaceBuffer = Buffer.from(replacePart);
      
      const before = newBuffer.slice(0, globalIdx);
      const after = newBuffer.slice(globalIdx + partBuffer.length);
      newBuffer = Buffer.concat([before, replaceBuffer, after]);
      
      console.log(`  替换为: ${replacePart}`);
    } else {
      console.log(`\n未找到: ${part}`);
    }
  });
  
  fs.writeFileSync(filePath, newBuffer);
  console.log('\n=== 文件已更新 ===');
}
