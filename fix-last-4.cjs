const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-Dnl5O9fy.js';
const buffer = fs.readFileSync(filePath);

console.log('=== 精确替换宣传海报路径 ===\n');

const search = Buffer.from('compressed.jpg');
let idx = buffer.indexOf(search);

if (idx !== -1) {
  console.log(`找到 "compressed.jpg" 在字节位置 ${idx}`);
  
  const segment = buffer.slice(idx - 600, idx + 20);
  
  let fixedBuffer = buffer;
  
  const replacements = [
    { from: '鍥剧墖1(1)_compressed', to: '/daijiaxuan2026/mori/宣传海报/图片1(1)_compressed' },
    { from: '鍥剧墖2(1)_compressed', to: '/daijiaxuan2026/mori/宣传海报/图片2(1)_compressed' },
    { from: '鍥剧墖3(1)_compressed', to: '/daijiaxuan2026/mori/宣传海报/图片3(1)_compressed' },
    { from: '鍥剧墖4(1)_compressed', to: '/daijiaxuan2026/mori/宣传海报/图片4(1)_compressed' }
  ];
  
  let fixed = 0;
  
  replacements.forEach(r => {
    const fromBuffer = Buffer.from(r.from);
    let pos = fixedBuffer.indexOf(fromBuffer);
    
    if (pos !== -1) {
      console.log(`\n✓ 找到: ${r.from} 在位置 ${pos}`);
      
      const toBuffer = Buffer.from(r.to);
      const before = fixedBuffer.slice(0, pos);
      const after = fixedBuffer.slice(pos + fromBuffer.length);
      fixedBuffer = Buffer.concat([before, toBuffer, after]);
      
      console.log(`  替换为: ${r.to}`);
      fixed++;
    } else {
      console.log(`\n✗ 未找到: ${r.from}`);
    }
  });
  
  if (fixed > 0) {
    fs.writeFileSync(filePath, fixedBuffer);
    console.log(`\n=== 成功修复 ${fixed} 个路径 ===`);
    console.log('✓ 文件已更新！');
  } else {
    console.log('\n没有找到需要修复的路径');
  }
} else {
  console.log('未找到 "compressed.jpg"');
}
