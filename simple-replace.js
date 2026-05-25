const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('简单替换方法...\n');

const search = 'compressed.jpg';
let idx = content.indexOf(search);

if (idx !== -1) {
  const start = idx - 500;
  const segment = content.substring(start, idx + 20);
  
  console.log('找到的片段:');
  console.log(segment);
  console.log('\n');
  
  const searchStr = segment.substring(segment.indexOf('['));
  console.log('搜索字符串:');
  console.log(JSON.stringify(searchStr));
  
  const replaceStr = searchStr
    .replace('瀹ｄ紶娴锋姤/鍥剧墖1(1)_compressed.jpg', '/daijiaxuan2026/mori/宣传海报/图片1(1)_compressed.jpg')
    .replace('瀹ｄ紶娴锋姤/鍥剧墖2(1)_compressed.jpg', '/daijiaxuan2026/mori/宣传海报/图片2(1)_compressed.jpg')
    .replace('瀹ｄ紶娴锋姤/鍥剧墖3(1)_compressed.jpg', '/daijiaxuan2026/mori/宣传海报/图片3(1)_compressed.jpg')
    .replace('瀹ｄ紶娴锋姤/鍥剧墖4(1)_compressed.jpg', '/daijiaxuan2026/mori/宣传海报/图片4(1)_compressed.jpg');
  
  console.log('替换结果:');
  console.log(JSON.stringify(replaceStr));
  
  if (searchStr !== replaceStr) {
    content = content.replace(searchStr, replaceStr);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('\n✓ 文件已更新！');
  } else {
    console.log('\n没有找到匹配的字符串');
  }
}
