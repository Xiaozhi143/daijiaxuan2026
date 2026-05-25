const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('=== 修复 mori/cj、mori/宣传海报、xiang 路径 ===\n');

// 修复模板变量和乱码
const fixes = [
  // mori/cj 模板变量
  ['mori/cj/鍥剧墖${v}.png', 'mori/cj/图片1.png'],
  
  // mori/宣传海报 乱码
  ['mori/瀹ｄ紶娴锋姤', 'mori/宣传海报'],
  
  // xiang 模板变量
  ['xiang/${v}.jpg', 'xiang/0.jpg'],
  
  // xiang 乱码
  ['鎬绘捣鎶', '总海报'],
];

let fixed = 0;

fixes.forEach(([wrong, correct]) => {
  const count = content.split(wrong).length - 1;
  
  if (count > 0) {
    content = content.split(wrong).join(correct);
    console.log(`✓ 修复 ${count} 个: ${wrong} -> ${correct}`);
    fixed += count;
  }
});

if (fixed > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\n=== 成功修复 ${fixed} 个问题 ===`);
} else {
  console.log('没有找到需要修复的内容');
}
