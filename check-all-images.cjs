const fs = require('fs');
const path = require('path');

console.log('=== 系统检查所有图片文件 ===\n');

const baseDir = 'c:/git/daijiaxuan2026';

const imageFiles = [
  // photo
  { folder: '', file: 'photo.png' },
  
  // mori/cj
  { folder: 'mori/cj', file: '图片1.png' },
  { folder: 'mori/cj', file: '图片2.png' },
  { folder: 'mori/cj', file: '图片3.png' },
  { folder: 'mori/cj', file: '图片4.png' },
  { folder: 'mori/cj', file: '图片5.png' },
  { folder: 'mori/cj', file: '图片6.png' },
  { folder: 'mori/cj', file: '图片7.png' },
  { folder: 'mori/cj', file: '图片8.png' },
  { folder: 'mori/cj', file: '图片9.png' },
  
  // mori/宣传海报
  { folder: 'mori/宣传海报', file: '图片1(1)_compressed.jpg' },
  { folder: 'mori/宣传海报', file: '图片2(1)_compressed.jpg' },
  { folder: 'mori/宣传海报', file: '图片3(1)_compressed.jpg' },
  { folder: 'mori/宣传海报', file: '图片4(1)_compressed.jpg' },
  
  // xiang
  { folder: 'xiang', file: '0.jpg' },
  { folder: 'xiang', file: '1.jpg' },
  { folder: 'xiang', file: '2.jpg' },
  { folder: 'xiang', file: '3.jpg' },
  { folder: 'xiang', file: '4.jpg' },
  { folder: 'xiang', file: '5.jpg' },
  { folder: 'xiang', file: '6.jpg' },
  { folder: 'xiang', file: '7.jpg' },
  { folder: 'xiang', file: '8.jpg' },
  { folder: 'xiang', file: '9.jpg' },
  
  // car
  { folder: 'car', file: '图片0.png' },
  
  // kid
  { folder: 'kid', file: '图片0.png' },
  { folder: 'kid', file: '图片1.png' },
  { folder: 'kid', file: '图片2.png' },
  { folder: 'kid', file: '图片3.png' },
  { folder: 'kid', file: '图片4.png' },
  { folder: 'kid', file: '图片5.png' },
  { folder: 'kid', file: '图片6.png' },
  
  // mf
  { folder: 'mf', file: '图片1.jpg' },
  { folder: 'mf', file: '图片2.jpg' },
  { folder: 'mf', file: '055f5d9c591bab5339847a73f3bbdf3.jpg' },
  { folder: 'mf', file: '79c28d881b15cb04c25d2eff5b65fee.png' },
  
  // eater
  { folder: 'eater', file: '图片0.png' },
];

let existing = 0;
let missing = 0;

imageFiles.forEach(item => {
  const fullPath = path.join(baseDir, item.folder, item.file);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    existing++;
    console.log(`✓ ${item.folder ? item.folder + '/' : ''}${item.file}`);
  } else {
    missing++;
    console.log(`✗ ${item.folder ? item.folder + '/' : ''}${item.file} - 文件不存在!`);
  }
});

console.log(`\n=== 检查结果 ===`);
console.log(`总计: ${imageFiles.length} 个文件`);
console.log(`存在: ${existing} 个`);
console.log(`缺失: ${missing} 个`);
