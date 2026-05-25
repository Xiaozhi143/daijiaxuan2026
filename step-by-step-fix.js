const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('=== 分步替换每个路径 ===\n');

const search = 'compressed.jpg';
let idx = content.indexOf(search);

if (idx !== -1) {
  console.log(`找到 "compressed.jpg" 在位置 ${idx}`);
  
  const before = content.substring(0, idx);
  const after = content.substring(idx);
  
  console.log('\n前面的内容（最后200字符）:');
  console.log(before.slice(-200));
  
  const paths = before.slice(-600).match(/"[^"]+"/g) || [];
  
  console.log('\n找到的路径:');
  paths.forEach((p, i) => console.log(`${i}: ${p}`));
  
  let fixed = 0;
  let newBefore = before;
  
  paths.forEach(oldPath => {
    const cleanPath = oldPath.replace(/"/g, '');
    
    if (cleanPath.includes('娴') && cleanPath.includes('compressed')) {
      const parts = cleanPath.split('/');
      const filename = parts[parts.length - 1];
      const newPath = `"/daijiaxuan2026/mori/宣传海报/${filename}"`;
      
      if (newBefore.includes(oldPath)) {
        newBefore = newBefore.replace(oldPath, newPath);
        console.log(`\n✓ 替换:`);
        console.log(`  ${oldPath}`);
        console.log(`  → ${newPath}`);
        fixed++;
      }
    }
  });
  
  if (fixed > 0) {
    const newContent = newBefore + after;
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`\n=== 成功修复 ${fixed} 个路径 ===`);
  } else {
    console.log('\n没有找到需要替换的路径');
  }
}
