const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('=== 查找并修复宣传海报路径 ===\n');

const search = 'compressed.jpg';
let idx = content.indexOf(search);

if (idx !== -1) {
  const start = idx - 550;
  const segment = content.substring(start, idx);
  
  console.log('片段内容（JSON格式）:');
  console.log(JSON.stringify(segment));
  console.log('\n');
  
  const paths = segment.match(/["'][^"']+compressed[^"']+["']/g);
  
  if (paths) {
    console.log('找到的所有包含compressed的路径:');
    paths.forEach((p, i) => {
      console.log(`${i}: ${p}`);
    });
    
    let fixed = 0;
    
    paths.forEach(oldPath => {
      const cleanPath = oldPath.replace(/["']/g, '');
      
      if (cleanPath.includes('娴') || cleanPath.includes('compressed')) {
        const parts = cleanPath.split('/');
        const filename = parts[parts.length - 1];
        const newPath = `"/daijiaxuan2026/mori/宣传海报/${filename}"`;
        
        if (content.includes(oldPath)) {
          content = content.replace(oldPath, newPath);
          console.log(`\n✓ 替换:`);
          console.log(`  旧: ${oldPath}`);
          console.log(`  新: ${newPath}`);
          fixed++;
        }
      }
    });
    
    if (fixed > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`\n=== 成功修复 ${fixed} 个路径 ===`);
      console.log('文件已更新！');
    }
  } else {
    console.log('未找到包含compressed的路径');
  }
}
