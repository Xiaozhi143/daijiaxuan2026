const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('提取并精确替换...\n');

const search = 'compressed.jpg';
let idx = content.indexOf(search);

if (idx !== -1) {
  const start = idx - 500;
  const before = content.substring(start, idx);
  
  const paths = before.match(/["'][^"']+["']/g) || [];
  
  console.log('找到的路径:');
  paths.forEach((p, i) => console.log(`${i}: ${p}`));
  
  let fixed = 0;
  
  paths.forEach(oldPath => {
    const cleanPath = oldPath.replace(/["']/g, '');
    
    if (cleanPath.includes('娴') || cleanPath.includes('compressed')) {
      const filename = cleanPath.split('/').pop();
      const newPath = `"/daijiaxuan2026/mori/宣传海报/${filename}"`;
      
      if (content.includes(oldPath)) {
        content = content.replace(oldPath, newPath);
        console.log(`✓ 替换: ${oldPath} -> ${newPath}`);
        fixed++;
      }
    }
  });
  
  if (fixed > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`\n=== 成功替换 ${fixed} 个路径 ===`);
  } else {
    console.log('\n没有找到需要替换的路径');
  }
}
