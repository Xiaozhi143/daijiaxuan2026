const fs = require('fs');

const filePath = 'c:/git/daijiaxuan2026/assets/index-B5ugdZHh-github.js';
let content = fs.readFileSync(filePath, 'utf8');

console.log('=== 修复宣传海报编码问题 ===\n');

let count = (content.match(/瀹ｄ紶娴锋姤/g) || []).length;
console.log(`发现 "瀹ｄ紶娴锋姤": ${count} 次`);

if (count > 0) {
  content = content.replace(/瀹ｄ紶娴锋姤/g, '宣传海报');
  console.log('✓ 已替换为 "宣传海报"');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('\n文件已更新！');
} else {
  console.log('没有找到需要修复的内容');
}
