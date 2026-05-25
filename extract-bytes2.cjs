const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-Dnl5O9fy.js';
const buffer = fs.readFileSync(filePath);

console.log('=== 提取确切字节序列 ===\n');

const search = Buffer.from('compressed.jpg');
let idx = buffer.indexOf(search);

if (idx !== -1) {
  console.log(`找到 "compressed.jpg" 在字节位置 ${idx}`);
  
  const start = idx - 550;
  const segment = buffer.slice(start, idx + 10);
  const segmentStr = segment.toString('utf8');
  
  console.log('\n提取的片段:');
  console.log(segmentStr);
  
  const parts = segmentStr.split('"').filter(p => p.includes('compressed'));
  
  if (parts.length > 0) {
    console.log('\n找到的路径部分:');
    parts.forEach((p, i) => console.log(`${i}: ${p}`));
    
    const originalPath = parts[0];
    console.log('\n原始路径:', originalPath);
    
    const pathBuffer = Buffer.from(originalPath);
    console.log('\n路径的字节序列:');
    console.log(pathBuffer.toString('hex'));
    
    console.log('\n每个字符的字节:');
    const chars = [];
    let i = 0;
    while (i < pathBuffer.length) {
      if (pathBuffer[i] < 0x80) {
        chars.push({ byte: pathBuffer[i], char: String.fromCharCode(pathBuffer[i]) });
        i++;
      } else if (pathBuffer[i] < 0xE0) {
        chars.push({ byte: pathBuffer.slice(i, i+2).toString('hex'), char: pathBuffer.slice(i, i+2).toString('utf8') });
        i += 2;
      } else if (pathBuffer[i] < 0xF0) {
        chars.push({ byte: pathBuffer.slice(i, i+3).toString('hex'), char: pathBuffer.slice(i, i+3).toString('utf8') });
        i += 3;
      } else {
        chars.push({ byte: pathBuffer.slice(i, i+4).toString('hex'), char: pathBuffer.slice(i, i+4).toString('utf8') });
        i += 4;
      }
    }
    
    chars.forEach((c, i) => {
      console.log(`${i}: ${c.byte} -> "${c.char}"`);
    });
  }
}
