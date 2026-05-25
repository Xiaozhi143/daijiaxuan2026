const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
const buffer = fs.readFileSync(filePath);

console.log('=== 提取并替换精确字节序列 ===\n');

const search = Buffer.from('compressed.jpg');
let idx = buffer.indexOf(search);

if (idx !== -1) {
  console.log(`找到 "compressed.jpg" 在字节位置 ${idx}`);
  
  const start = idx - 600;
  const segment = buffer.slice(start, idx);
  
  console.log('\n提取的片段（最后200字节）:');
  const last200 = segment.slice(-200);
  console.log(last200.toString('utf8'));
  
  let fixedBuffer = buffer;
  
  const searchInBuffer = (segment.toString('utf8'));
  
  const terms = [
    '鍥剧墖1',
    '鍥剧墖2',
    '鍥剧墖3',
    '鍥剧墖4'
  ];
  
  let fixed = 0;
  
  terms.forEach(term => {
    const termBuffer = Buffer.from(term);
    let pos = fixedBuffer.indexOf(termBuffer);
    
    if (pos !== -1) {
      console.log(`\n✓ 找到字节序列 "${term}" 在位置 ${pos}`);
      
      let contextBuffer = fixedBuffer.slice(pos, pos + 50);
      let contextStr = contextBuffer.toString('utf8');
      console.log(`  上下文: ${contextStr}`);
      
      const imgNum = term.slice(-1);
      const replaceWith = `/daijiaxuan2026/mori/宣传海报/图片${imgNum}(1)_compressed`;
      const replaceBuffer = Buffer.from(replaceWith);
      
      const before = fixedBuffer.slice(0, pos);
      const after = fixedBuffer.slice(pos + termBuffer.length);
      fixedBuffer = Buffer.concat([before, replaceBuffer, after]);
      
      console.log(`  替换为: ${replaceWith}`);
      fixed++;
    }
  });
  
  if (fixed > 0) {
    fs.writeFileSync(filePath, fixedBuffer);
    console.log(`\n=== 成功修复 ${fixed} 个路径 ===`);
  }
}
