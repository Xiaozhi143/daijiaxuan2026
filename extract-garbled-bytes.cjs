const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
const content = fs.readFileSync(filePath, 'utf8');

// 提取所有乱码字符的字节
const garbled = ['鍏酰浼犲', '鍥剧墖12', '鍥剧墖7', '鍥剧墖8', '鍥剧墖9', '鍥剧墖10'];

garbled.forEach(g => {
  const idx = content.indexOf(g);
  if (idx !== -1) {
    const buf = Buffer.from(g, 'utf8');
    console.log(`${g}: ${buf.toString('hex')}`);
  }
});

// 正确的字节
const correct = ['入口', '图片12', '图片7', '图片8', '图片9', '图片10'];
correct.forEach(c => {
  const buf = Buffer.from(c, 'utf8');
  console.log(`${c}: ${buf.toString('hex')}`);
});
