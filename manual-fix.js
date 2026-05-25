const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
const content = fs.readFileSync(filePath, 'utf8');

console.log('=== 查找宣传海报相关路径 ===\n');

const search = 'compressed.jpg';
let idx = content.indexOf(search);

if (idx !== -1) {
  const start = idx - 520;
  const segment = content.substring(start, idx + 20);
  
  console.log('原始内容:');
  console.log(segment);
  console.log('\n');
  
  console.log('JSON格式:');
  console.log(JSON.stringify(segment));
  
  const oldString = '["瀹ｄ紶娴锋姤/鍥剧墖1(1)_compressed.jpg","瀹ｄ紶娴锋姤/鍥剧墖2(1)_compressed.jpg","瀹ｄ紶娴锋姤/鍥剧墖3(1)_compressed.jpg","瀹ｄ紶娴锋姤/鍥剧墖4(1)_compressed.jpg"]';
  
  if (content.includes(oldString)) {
    console.log('\n找到要替换的字符串!');
    
    const newString = '["/daijiaxuan2026/mori/宣传海报/图片1(1)_compressed.jpg","/daijiaxuan2026/mori/宣传海报/图片2(1)_compressed.jpg","/daijiaxuan2026/mori/宣传海报/图片3(1)_compressed.jpg","/daijiaxuan2026/mori/宣传海报/图片4(1)_compressed.jpg"]';
    
    let newContent = content.replace(oldString, newString);
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('\n✓ 成功替换所有4个路径!');
    console.log('文件已更新。');
  } else {
    console.log('\n未找到精确匹配的字符串');
    console.log('检查片段中是否包含这些字符...');
    
    if (segment.includes('瀹')) {
      console.log('包含: 瀹');
    }
    if (segment.includes('娴')) {
      console.log('包含: 娴');
    }
    if (segment.includes('紶')) {
      console.log('包含: 紶');
    }
    if (segment.includes('鍥')) {
      console.log('包含: 鍥');
    }
  }
}
