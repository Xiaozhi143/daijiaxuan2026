const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-DMtP-9dy.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('直接搜索并替换...\n');

const search = 'compressed.jpg';
let idx = content.indexOf(search);

if (idx !== -1) {
  const start = idx - 50;
  const substring = content.substring(start, idx + 30);
  
  console.log('片段:', substring);
  console.log();
  
  const lines = substring.split(',');
  
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.includes('鍥') || trimmed.includes('compressed')) {
      console.log(`行 ${i}: ${trimmed}`);
      
      const match = trimmed.match(/"([^"]*鍥[^"]*)"/);
      if (match) {
        const oldPath = match[1];
        const filename = oldPath.split('/').pop();
        const newPath = `/daijiaxuan2026/mori/宣传海报/${filename}`;
        
        console.log(`  旧路径: ${oldPath}`);
        console.log(`  新路径: ${newPath}`);
        
        content = content.replace(`"${oldPath}"`, `"${newPath}"`);
        console.log(`  ✓ 已替换\n`);
      }
    }
  });
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('=== 文件已更新 ===');
}
