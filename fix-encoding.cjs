const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-Dnl5O9fy.js';
let buffer = fs.readFileSync(filePath);

console.log('=== 字节级替换乱码路径 ===\n');

const replacements = [
  { 
    search: Buffer.from([0xe5, 0x9b, 0xbe, 0xe7, 0x89, 0x87, 0x31, 0x32, 0x2e, 0x70, 0x6e, 0x67]), // 鍥剧墖12.png
    replace: Buffer.from([0xe5, 0x9b, 0xbe, 0xe7, 0x89, 0x87, 0x31, 0x32, 0x2e, 0x70, 0x6e, 0x67]) // 鍥剧墖12.png
  }
];

// 更简单的方法：直接用字符串替换
let content = buffer.toString('utf8');

// 替换鍥剧墖12.png
let idx1 = content.indexOf('鍥剧墖12.png');
if (idx1 !== -1) {
  console.log('找到鍥剧墖12.png，替换为图片12.png');
  content = content.replace('鍥剧墖12.png', '图片12.png');
}

// 替换鍏ュ彛 .png
let idx2 = content.indexOf('鍏ュ彛 .png');
if (idx2 !== -1) {
  console.log('找到鍏ュ彛 .png，替换为入口 .png');
  content = content.replace('鍏ュ彛 .png', '入口 .png');
}

// 替换鎬绘捣鎶为总海报
let idx3 = content.indexOf('鎬绘捣鎶');
if (idx3 !== -1) {
  console.log('找到鎬绘捣鎶，替换为总海报');
  content = content.replace('鎬绘捣鎶', '总海报');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('\n✓ 文件已更新！');
