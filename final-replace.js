const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('=== 最终替换方案 ===\n');

const search = 'compressed.jpg';
let idx = content.indexOf(search);

if (idx !== -1) {
  const start = idx - 500;
  const segment = content.substring(start, idx + 20);
  
  console.log('提取的片段:');
  console.log(segment);
  console.log('\n');
  
  const searchStr = 'children:["';
  const searchIdx = segment.indexOf(searchStr);
  
  if (searchIdx !== -1) {
    const arrayStart = segment.indexOf('[', searchIdx);
    const arrayContent = segment.substring(arrayStart);
    
    console.log('数组内容:');
    console.log(arrayContent);
    console.log('\n');
    
    const oldPaths = arrayContent.match(/"[^"]+"/g) || [];
    console.log('找到的路径:');
    oldPaths.forEach((p, i) => console.log(`${i}: ${p}`));
    
    if (oldPaths.length === 4) {
      const newArray = `["/daijiaxuan2026/mori/宣传海报/图片1(1)_compressed.jpg","/daijiaxuan2026/mori/宣传海报/图片2(1)_compressed.jpg","/daijiaxuan2026/mori/宣传海报/图片3(1)_compressed.jpg","/daijiaxuan2026/mori/宣传海报/图片4(1)_compressed.jpg"]`;
      
      const originalArray = oldPaths.join(',');
      
      console.log('\n原始数组:');
      console.log(originalArray);
      
      let newContent = content.replace(originalArray, newArray);
      
      if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log('\n✓ 成功替换所有4个路径!');
      } else {
        console.log('\n替换失败，尝试另一种方法...');
        
        const toReplace = content.substring(start, idx + 10);
        const newSegment = toReplace.replace(originalArray, newArray);
        
        newContent = content.replace(toReplace, newSegment);
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log('✓ 使用备用方法替换成功!');
      }
    }
  }
}
