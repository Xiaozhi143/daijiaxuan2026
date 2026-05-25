const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-Dnl5O9fy.js';
const content = fs.readFileSync(filePath, 'utf8');

console.log('=== 提取乱码的字节序列 ===\n');

const searchTerms = [
  { wrong: '鍥剧墖12.png', correct: '图片12.png' },
  { wrong: '鍏ュ彛 .png', correct: '入口 .png' },
  { wrong: '鎬绘捣鎶?', correct: '总海报' }
];

searchTerms.forEach(item => {
  const idx = content.indexOf(item.wrong);
  if (idx !== -1) {
    const wrongBuffer = Buffer.from(item.wrong, 'utf8');
    const correctBuffer = Buffer.from(item.correct, 'utf8');
    
    console.log(`\n${item.correct}:`);
    console.log(`  错误字符串: ${item.wrong}`);
    console.log(`  正确字符串: ${item.correct}`);
    console.log(`  错误字节: ${wrongBuffer.toString('hex')}`);
    console.log(`  正确字节: ${correctBuffer.toString('hex')}`);
  }
});
