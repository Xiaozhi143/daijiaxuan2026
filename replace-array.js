const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('直接定位并替换整个数组...\n');

const search = 'compressed.jpg';
let idx = content.indexOf(search);

if (idx !== -1) {
  const start = idx - 520;
  
  const snippet = content.substring(start, idx + 10);
  console.log('snippet:', JSON.stringify(snippet));
  
  const arrayPattern = /\["[^"\]]+compressed[^"\]]+\]/g;
  const match = snippet.match(arrayPattern);
  
  if (match) {
    console.log('找到数组:', match[0]);
    
    const newArray = '["/daijiaxuan2026/mori/宣传海报/图片1(1)_compressed.jpg","/daijiaxuan2026/mori/宣传海报/图片2(1)_compressed.jpg","/daijiaxuan2026/mori/宣传海报/图片3(1)_compressed.jpg","/daijiaxuan2026/mori/宣传海报/图片4(1)_compressed.jpg"]';
    
    content = content.replace(match[0], newArray);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✓ 文件已更新！');
  } else {
    console.log('未找到匹配的数组');
  }
}
