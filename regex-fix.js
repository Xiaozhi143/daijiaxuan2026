const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('=== 使用正则表达式替换 ===\n');

const search = 'compressed.jpg';
let idx = content.indexOf(search);

if (idx !== -1) {
  console.log(`找到 "compressed.jpg" 在位置 ${idx}`);
  
  const start = idx - 520;
  const segment = content.substring(start, idx);
  
  const pattern = /\["[^"\]]*娴[^"\]]*compressed[^"\]]*\]/g;
  const match = segment.match(pattern);
  
  if (match && match.length > 0) {
    console.log('\n找到数组:');
    console.log(match[0]);
    console.log('\nJSON:');
    console.log(JSON.stringify(match[0]));
    
    const newArray = '["/daijiaxuan2026/mori/宣传海报/图片1(1)_compressed.jpg","/daijiaxuan2026/mori/宣传海报/图片2(1)_compressed.jpg","/daijiaxuan2026/mori/宣传海报/图片3(1)_compressed.jpg","/daijiaxuan2026/mori/宣传海报/图片4(1)_compressed.jpg"]';
    
    let fixedContent = content.replace(match[0], newArray);
    
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    console.log('\n✓ 成功替换数组!');
    console.log('文件已更新。');
  } else {
    console.log('\n未找到匹配的数组');
    
    const simplePattern = /娴.*compressed/g;
    const simpleMatch = segment.match(simplePattern);
    
    if (simpleMatch) {
      console.log('\n找到简化匹配:');
      simpleMatch.forEach(m => console.log(m));
    }
  }
}
